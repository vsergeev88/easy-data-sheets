import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import type { DataSheet } from "@/lib/data/dataSheets";
import { useLocalAutosave } from "../../hooks/useLocalAutosave";
import FormView from "./FormView";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export type EditorClientProps = {
	dataSheet: DataSheet;
};

function EditorClient({ dataSheet }: EditorClientProps) {
	const editorAppStore = useEditorAppStore();

	useEffect(() => {
		if (!editorAppStore.isInitialized) {
			editorAppStore.init(dataSheet);
		}
	}, [editorAppStore, dataSheet]);

	useLocalAutosave(dataSheet.id);

	if (!editorAppStore.isInitialized) {
		return null;
	}

	return (
		<div className="grid h-full grid-cols-[280px_1fr_340px] overflow-hidden">
			<div className="h-full border-r border-gray-200">
				<LeftPanel />
			</div>
			<div className="h-full pl-2 flex-1 overflow-auto bg-gray-50 py-4">
				<FormView />
			</div>
			<div className="h-full bg-gray-50">
				<RightPanel />
			</div>
		</div>
	);
}

export default observer(EditorClient);