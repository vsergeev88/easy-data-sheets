import { useEditorAppStore } from "@editorAppStore";
import { Eye, Palette, Redo, Sparkles, Undo } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { PremiumIcon } from "@/components/PremiumIcon";
import { ServiceButton } from "@/components/ServiceButton";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import type { DataSheet } from "@/lib/data/dataSheets";
import { useAutosave } from "../../hooks/useAutosave";
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

	useAutosave();

	if (!editorAppStore.isInitialized) {
		return null;
	}

	return (
		<div className="grid h-full grid-cols-[280px_1fr_340px] overflow-hidden xl:grid-cols-[280px_1fr_400px]">
			<div className="h-full border-gray-200 border-r">
				<LeftPanel />
			</div>
			<div className="overflow-hidden bg-gray-50 py-4 pl-2">
				<div className="flex items-center justify-between gap-2 pb-2">
					<div className="flex items-center gap-2">
						<ServiceButton
							className=""
							disabled
							icon={<Undo />}
							tooltip="Undo"
							variant="outline"
						/>
						<ServiceButton
							className=""
							disabled
							icon={<Redo />}
							tooltip="Redo"
							variant="outline"
						/>
					</div>
					<div className="flex items-center gap-2">
						{/* <Tooltip message="Change colors">
							<Button variant="outline" className=""> <Palette /> Colors</Button>
						</Tooltip> */}
						{/* <Tooltip message="Generate data sheet with AI">
							<Button variant="outline" className="" disabled> <Sparkles /> AI Generate (soon) <PremiumIcon /></Button>
						</Tooltip>
						 */}
					</div>
				</div>
				<div className="h-full overflow-auto pb-6">
					<FormView />
				</div>
			</div>
			<div className="h-full bg-gray-50">
				<RightPanel />
			</div>
		</div>
	);
}

export default observer(EditorClient);
