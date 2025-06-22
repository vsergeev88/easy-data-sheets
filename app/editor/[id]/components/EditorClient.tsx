import { useEditorAppStore } from "@editorAppStore";
import { Eye, Palette, Redo, Sparkles, Undo } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { PremiumIcon } from "@/components/PremiumIcon";
import { ServiceButton } from "@/components/ServiceButton";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
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
		<div className="grid h-full grid-cols-[280px_1fr_340px] xl:grid-cols-[280px_1fr_400px] overflow-hidden">
			<div className="h-full border-r border-gray-200">
				<LeftPanel />
			</div>
			<div className="pl-2 overflow-hidden bg-gray-50 py-4">
				<div className="flex items-center justify-between gap-2 pb-2">
					<div className="flex items-center gap-2">
						<ServiceButton
							icon={<Undo />}
							tooltip="Undo"
							variant="outline"
							className=""
							disabled
						/>
						<ServiceButton
							icon={<Redo />}
							tooltip="Redo"
							variant="outline"
							className=""
							disabled
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