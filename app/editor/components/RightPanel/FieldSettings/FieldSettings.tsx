import type { IEditorFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";

import { useEditorAppStore } from "@editorAppStore";
import { Settings, X } from "lucide-react";
import { observer } from "mobx-react-lite";

import { ServiceButton } from "@/components/ServiceButton";

import { fieldSettingsMap } from "./fieldSettingsMap";
import SubmitButtonSettings from "./SubmitButtonSettings";

const FieldSettings = ({ fieldId }: { fieldId: string }) => {
	const { safeFormData } = useEditorAppStore();

	const getFieldSettingsComponent = () => {
		if (fieldId === "submit-button") {
			return <SubmitButtonSettings />;
		}

		// At this point, field is guaranteed to be a regular field, not submit button
		const regularField = safeFormData.getFieldById(fieldId);
		const FieldSettingsComponent = fieldSettingsMap[
			regularField.type
		] as React.ComponentType<{ field: IEditorFieldModel }>;
		return <FieldSettingsComponent field={regularField} />;
	};

	return (
		<div className="border border-gray-200 bg-background p-4">
			<div className="flex items-center justify-between font-medium text-lg">
				<h2 className="flex items-center gap-2">
					<Settings className="size-4" />
					Field settings
				</h2>
				<ServiceButton
					icon={<X />}
					onClick={() => {
						safeFormData.setSelectedFieldId(null);
					}}
					tooltip="Close"
				/>
			</div>
			<div className="mt-4">{getFieldSettingsComponent()}</div>
		</div>
	);
};

export default observer(FieldSettings);
