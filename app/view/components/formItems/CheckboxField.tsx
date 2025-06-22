import type React from "react";
import type { ICheckboxFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import BaseCheckboxField from "@/components/baseFormItems/BaseCheckboxField";
import FormItemWrapper from "./FormItemWrapper";

type CheckboxFieldProps = { field: ICheckboxFieldModel }

const CheckboxField: React.FC<CheckboxFieldProps> = ({ field
}) => {
	return (
		<FormItemWrapper field={field}>
			<BaseCheckboxField
				field={field}
			/>
		</FormItemWrapper>
	);
};
export default CheckboxField;
