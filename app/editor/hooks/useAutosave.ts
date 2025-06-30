import { onSnapshot } from "mobx-state-tree";
import { useCallback, useEffect, useRef } from "react";
import { useEditorAppStore } from "./useEditorAppStore";

const AUTOSAVE_DELAY = 3000;

export const useAutosave = () => {
	const editorAppStore = useEditorAppStore();
	const skipSavingRef = useRef(false);
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const isAutosaveEnabled = useRef(true);

	// Debounced save function
	const debouncedSave = useCallback(() => {
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current);
		}

		saveTimeoutRef.current = setTimeout(() => {
			if (!skipSavingRef.current) {
				editorAppStore.save();
			}
		}, AUTOSAVE_DELAY);
	}, [editorAppStore]);

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
	}, [editorAppStore, debouncedSave]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current);
			}
		};
	}, []);
};
