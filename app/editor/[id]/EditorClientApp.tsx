"use client";

import {
	EditorAppStoreContext,
	editorAppStore,
} from "../stores/editorAppStore/editorAppStore";
import EditorClient, { type EditorClientProps } from "./components/EditorClient";

export const EditorClientApp = ({ dataSheet }: EditorClientProps) => {
	if (!dataSheet) return <div>No data sheet</div>;
	return (
		<EditorAppStoreContext.Provider value={editorAppStore}>
			<p>EditorClientApp</p>
			<EditorClient dataSheet={dataSheet} />
		</EditorAppStoreContext.Provider>
	);
};
