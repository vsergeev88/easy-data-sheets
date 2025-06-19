import { useEditorAppStore } from "@editorAppStore";
import { useEffect } from "react";
import type { DataSheet } from "@/lib/data/dataSheets";
import FormView from "./FormView";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

export type EditorClientProps = {
	dataSheet: DataSheet;
};

export default function EditorClient({ dataSheet }: EditorClientProps) {
	const { init, isInitialized } = useEditorAppStore();
	useEffect(() => {
		if (!isInitialized) {
			console.log("init", dataSheet);
			init(dataSheet);
		}
	}, [init, isInitialized, dataSheet]);

	if (!isInitialized) {
		return null;
	}

	return (
		<div className="grid h-full grid-cols-[280px_1fr_340px] overflow-hidden">
			<div className="h-full border-r border-gray-200">
				<LeftPanel />
			</div>
			<div className="h-full flex-1 overflow-auto bg-gray-50 py-4">
				<FormView />
			</div>
			<div className="h-full bg-gray-50">
				<RightPanel />
			</div>
		</div>
	);
}
