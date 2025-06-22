import type React from "react";
import type { IFieldModel, ITextFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import BaseTextAreaField from "@/components/baseFormItems/BaseTextAreaField";
import type { TextField } from "@/lib/types/form";
import FormItemWrapper from "./FormItemWrapper";

type TextAreaFieldProps = TextField & {
	field: IFieldModel;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
	field
}) => {
	return (
		<FormItemWrapper
			field={field}
		>
			<BaseTextAreaField field={field as ITextFieldModel} />
		</FormItemWrapper>
	);
};
export default TextAreaField;
