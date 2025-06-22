import { useContext } from "react";
import {
	EditorAppStoreContext,
} from "../stores/editorAppStore";

export const useEditorAppStore = () => {
	const store = useContext(EditorAppStoreContext);
	if (!store) {
		throw new Error(
			"useEditorAppStore must be used within a EditorAppStoreContext",
		);
	}
	return store;
};
