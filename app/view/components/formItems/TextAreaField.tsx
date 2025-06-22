import type React from "react";
import type { ITextFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import BaseTextAreaField from "@/components/baseFormItems/BaseTextAreaField";
import FormItemWrapper from "./FormItemWrapper";

type TextAreaFieldProps = {
	field: ITextFieldModel;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
	field
}) => {
	return (

		<FormItemWrapper field={field}>
			<BaseTextAreaField field={field} />
		</FormItemWrapper>
	)

};
export default TextAreaField;
