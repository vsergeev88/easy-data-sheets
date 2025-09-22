import type { ITextFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import FieldLabelSettings from "./FieldLabelSettings";

export const TextInputSettings = ({ field }: { field: ITextFieldModel }) => {
	return (
		<div>
			<FieldLabelSettings field={field} />
		</div>
	);
};
