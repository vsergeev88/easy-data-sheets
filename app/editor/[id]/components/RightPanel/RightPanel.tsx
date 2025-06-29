import { useEditorAppStore } from "@editorAppStore";
import { Eye, Save, Share2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import FieldSettings from "./FieldSettings";
import PublishSettings from "./PublishSettings";

const RightPanel = () => {
	const { safeFormData, saveAndPublish, isSaving } = useEditorAppStore();

	return (
		<div className="ignore-deselect h-full px-2 py-4">
			<div className="mb-2 flex items-center justify-center gap-2">
				<Tooltip message="Preview data sheet">
					<Button className="" disabled={isSaving} variant="outline">
						{" "}
						<Eye /> Preview
					</Button>
				</Tooltip>
				<Button
					className="flex-1"
					disabled={isSaving}
					onClick={() => saveAndPublish()}
					variant="default"
				>
					{" "}
					<Save /> Save & Publish
				</Button>
			</div>
			{safeFormData.selectedFieldId ? (
				<FieldSettings fieldId={safeFormData.selectedFieldId} />
			) : (
				<PublishSettings />
			)}
		</div>
	);
};

export default observer(RightPanel);
