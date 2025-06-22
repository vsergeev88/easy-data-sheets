import { useEditorAppStore } from "@editorAppStore";
import { X } from "lucide-react";
import { observer } from "mobx-react-lite";
import { ServiceButton } from "@/components/ServiceButton";
import { fieldSettingsMap } from "./fieldSettingsMap";
import SubmitButtonSettings from "./SubmitButtonSettings";

const FieldSettings = ({ fieldId }: { fieldId: string | null }) => {
	const { safeFormData } = useEditorAppStore();

	if (!fieldId) return null;

	const getFieldSettingsComponent = () => {
		if (fieldId === "submit-button") {
			return <SubmitButtonSettings />;
		}

		// At this point, field is guaranteed to be a regular field, not submit button
		const regularField = safeFormData.getFieldById(fieldId);
		const FieldSettingsComponent = fieldSettingsMap[regularField.type] as React.ComponentType<{ field: any }>;
		return <FieldSettingsComponent field={regularField} />;
	}

	return (
		<div className="p-4 bg-background border-gray-200 border">
			<div className="flex items-center justify-between text-lg font-medium">
				<h2>Field settings</h2>
				<ServiceButton
					icon={<X />}
					tooltip="Close"
					onClick={() => {
						safeFormData.setSelectedFieldId(null);
					}}
				/>
			</div>
			<div className="mt-4">
				{getFieldSettingsComponent()}
			</div>
		</div>
	);
};

export default observer(FieldSettings);