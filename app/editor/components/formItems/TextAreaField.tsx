import { observer } from "mobx-react-lite";
import type React from "react";
import type { IBareFieldModel } from "@/app/stores/bareStores/bareFieldModel";
import type { IBareTextFieldModel } from "@/app/stores/bareStores/fields/bareTextFieldModel";
import BaseTextAreaField from "@/components/baseFormItems/BaseTextAreaField";
import FormItemWrapper from "./FormItemWrapper";

export type EditorTextAreaFieldProps = {
	field: IBareTextFieldModel;
};

const TextAreaField: React.FC<EditorTextAreaFieldProps> = ({ field }) => {
	return (
		<FormItemWrapper field={field as IBareFieldModel}>
			<BaseTextAreaField field={field} />
		</FormItemWrapper>
	);
};
export default observer(TextAreaField);
