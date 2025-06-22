import { useEditorAppStore } from "@editorAppStore";
import { Save, Share2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import FieldSettings from "./FieldSettings";

const RightPanel = () => {
	const { safeFormData } = useEditorAppStore();

	return (
		<div className="h-full py-4 px-2 ignore-deselect">
			<div className="flex flex-col items-center justify-end mb-4 gap-2">
				<Button variant="default" size="lg" className="w-full"> <Save /> Save & Publish</Button>
				<Button variant="link" size="lg" className="w-full"><Share2 /> Publish settings</Button>
			</div>
			<FieldSettings fieldId={safeFormData.selectedFieldId} />
		</div>
	);
};

export default observer(RightPanel);
