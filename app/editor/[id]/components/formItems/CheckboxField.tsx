import type React from "react";
import type { ICheckboxFieldModel, IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import BaseCheckboxField from "@/components/baseFormItems/BaseCheckboxField";
import type { CheckboxField as CheckboxFieldType } from "@/lib/types/form";
import FormItemWrapper from "./FormItemWrapper";

type CheckboxFieldProps = CheckboxFieldType & {
	field: IFieldModel;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
	field
}) => {
	return (
		<FormItemWrapper
			field={field}
		>
			<BaseCheckboxField
				field={field as ICheckboxFieldModel}
			/>
		</FormItemWrapper>
	);
};
export default CheckboxField;
