import type React from "react";
import type { IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import BaseFormItemWrapper from "@/components/baseFormItems/BaseFormItemWrapper";

type FormItemProps = {
	field: IFieldModel;
	children: React.ReactNode;
};

const FormItemWrapper: React.FC<FormItemProps> = ({
	field,
	children
}) => {
	return (
		<BaseFormItemWrapper field={field}>
			{children}
		</BaseFormItemWrapper>
	);
};

export default FormItemWrapper;
