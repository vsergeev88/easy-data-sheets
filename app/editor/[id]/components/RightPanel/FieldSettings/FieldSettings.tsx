import { useEditorAppStore } from "@editorAppStore";
import { X } from "lucide-react";
import { observer } from "mobx-react-lite";
import type { IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import { ServiceButton } from "@/components/ServiceButton";
import { fieldSettingsMap } from "./fieldSettingsMap";

const FieldSettings = ({ fieldId }: { fieldId: string | null }) => {
	const { safeFormData } = useEditorAppStore();

	if (!fieldId) return null;

	const field = fieldId === "submit-button" ? { type: "submit" } : safeFormData.getFieldById(fieldId);

	const FieldSettingsComponent = fieldId === "submit-button" ? () => <div>Submit button</div> : fieldSettingsMap[field.type] as React.FC<{ field: IFieldModel }>;

	return (
		<div className="p-4 bg-background border-gray-200 border">
			<div className="flex items-center justify-between text-lg font-medium">
				<h2>Settings</h2>
				<ServiceButton
					icon={<X />}
					tooltip="Close"
					onClick={() => {
						safeFormData.setSelectedFieldId(null);
					}}
				/>
			</div>
			<div className="mt-4">
				<FieldSettingsComponent field={field} />
			</div>
		</div>
	);
};

export default observer(FieldSettings);