import type { ITextFieldModel } from "@/app/editor/stores/editorAppStore/fields/textFieldModel";

import FieldLabelSettings from "./FieldLabelSettings";

export type TextInputSettingsProps = {
	field: ITextFieldModel;
};

export const TextInputSettings = ({ field }: TextInputSettingsProps) => {
	return (
		<div>
			<FieldLabelSettings field={field} />
		</div>
	);
};
