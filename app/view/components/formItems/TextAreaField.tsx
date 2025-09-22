import type React from "react";
import type { IBareTextFieldModel } from "@/app/stores/bareStores/fields/bareTextFieldModel";
import BaseTextAreaField from "@/components/baseFormItems/BaseTextAreaField";
import FormItemWrapper from "./FormItemWrapper";

export type ViewTextAreaFieldProps = {
	field: IBareTextFieldModel;
};

const TextAreaField: React.FC<ViewTextAreaFieldProps> = ({ field }) => {
	return (
		<FormItemWrapper field={field}>
			<BaseTextAreaField field={field} />
		</FormItemWrapper>
	);
};
export default TextAreaField;
