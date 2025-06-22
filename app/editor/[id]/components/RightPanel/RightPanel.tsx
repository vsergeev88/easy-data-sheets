import { useEditorAppStore } from "@editorAppStore";
import { Eye, Save, Share2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import FieldSettings from "./FieldSettings";
import PublishSettings from "./PublishSettings";

const RightPanel = () => {
	const { safeFormData } = useEditorAppStore();

	return (
		<div className="h-full py-4 px-2 ignore-deselect">
			<div className="flex items-center justify-center mb-2 gap-2">
				<Tooltip message="Preview data sheet">
					<Button variant="outline" className=""> <Eye /> Preview</Button>
				</Tooltip>
				<Button variant="default" className="flex-1"> <Save /> Save & Publish</Button>
			</div>
			{safeFormData.selectedFieldId ? <FieldSettings fieldId={safeFormData.selectedFieldId} /> : <PublishSettings />}
		</div>
	);
};

export default observer(RightPanel);
