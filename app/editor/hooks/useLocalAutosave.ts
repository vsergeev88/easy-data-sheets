import { onSnapshot } from "mobx-state-tree";
import { useEffect, useRef } from "react";
import { useEditorAppStore } from "./useEditorAppStore";

export const useLocalAutosave = (dataSheetId: string) => {
  const editorAppStore = useEditorAppStore();
  const skipSavingRef = useRef(false);
  const hasLoadedFromLocalStorage = useRef(false);

  // Load saved data from localStorage on initialization
  // biome-ignore lint: it crashes if it has deps to safeFormData
  useEffect(() => {
    if (!editorAppStore.isInitialized || !editorAppStore.formData || hasLoadedFromLocalStorage.current) return;

    const savedData = localStorage.getItem(`formData-${dataSheetId}`);
    if (savedData) {
      try {
        const { snapshot, updatedAt } = JSON.parse(savedData);

        // Compare timestamps to determine if saved data is newer
        if (new Date(updatedAt) > new Date(editorAppStore.safeFormInfo.updatedAt)) {
          skipSavingRef.current = true;
          hasLoadedFromLocalStorage.current = true;
          
          // Use a microtask to ensure the store is fully initialized
          Promise.resolve().then(() => {
            editorAppStore.replaceFormData(snapshot);
            // Reset the flag after the snapshot is applied
            setTimeout(() => {
              skipSavingRef.current = false;
            }, 100);
          });
        }
      } catch (error) {
        console.warn("Failed to parse saved form data:", error);
        localStorage.removeItem(`formData-${dataSheetId}`);
      }
    }
    
    hasLoadedFromLocalStorage.current = true;
  }, [editorAppStore.isInitialized, editorAppStore.formData, dataSheetId]);

  // Set up autosave listener
  useEffect(() => {
    if (!editorAppStore.isInitialized || !editorAppStore.formData) return;

    const disposer = onSnapshot(editorAppStore.formData, (snapshot) => {
      if (skipSavingRef.current) {
        return;
      }

      try {
        localStorage.setItem(
          `formData-${dataSheetId}`, 
          JSON.stringify({ 
            snapshot, 
            updatedAt: new Date().toISOString() 
          })
        );
      } catch (error) {
        console.warn("Failed to save form data to localStorage:", error);
      }
    });

    return disposer;
  }, [editorAppStore.isInitialized, editorAppStore.formData, dataSheetId]);
};