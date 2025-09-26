import { onSnapshot } from "mobx-state-tree";
import { useEffect, useRef } from "react";

import { useEditorAppStore } from "./useEditorAppStore";

const AUTOSAVE_DELAY = 3000;

export const useAutosave = () => {
  const editorAppStore = useEditorAppStore();
  const skipSavingRef = useRef(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAutosaveEnabled = useRef(true);

  // Set up autosave listener
  useEffect(() => {
    if (
      !(
        editorAppStore.isInitialized &&
        editorAppStore.formData &&
        isAutosaveEnabled.current
      )
    ) {
      return;
    }

    const debouncedSave = () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        if (!skipSavingRef.current) {
          editorAppStore.save();
        }
      }, AUTOSAVE_DELAY);
    };

    const disposer = onSnapshot(editorAppStore.formData, () => {
      if (skipSavingRef.current) {
        return;
      }

      debouncedSave();
    });

    return () => {
      disposer();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [editorAppStore.isInitialized, editorAppStore.formData, editorAppStore]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);
};
