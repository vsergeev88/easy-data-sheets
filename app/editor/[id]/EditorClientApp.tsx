"use client";

import EditorClient, {
	type EditorClientProps,
} from "../components/EditorClient";
import {
	EditorAppStoreContext,
	editorAppStore,
} from "../stores/editorAppStore/editorAppStore";

export const EditorClientApp = ({ dataSheet }: EditorClientProps) => {
	if (!dataSheet) {
		return <div>No data sheet</div>;
	}
	return (
		<EditorAppStoreContext.Provider value={editorAppStore}>
			<EditorClient dataSheet={dataSheet} />
		</EditorAppStoreContext.Provider>
	);
};
