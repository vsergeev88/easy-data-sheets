import { ServiceButton } from "@/components/ServiceButton";
import { useEditorAppStore } from "@editorAppStore";
import { X } from "lucide-react";
import { fieldSettingsMap } from "./fieldSettingsMap";

export const FieldSettings = ({ fieldId }: { fieldId: string | null }) => {
	const { safeFormData } = useEditorAppStore();

	if (!fieldId) return null;

	const field = safeFormData.getFieldById(fieldId);

	const FieldSettingsComponent = fieldSettingsMap[field.type];

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
