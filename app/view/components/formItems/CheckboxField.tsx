import type React from "react";
import type { IBareCheckboxFieldModel } from "@/app/stores/bareStores/fields/bareCheckboxFieldModel";
import BaseCheckboxField from "@/components/baseFormItems/BaseCheckboxField";
import FormItemWrapper from "./FormItemWrapper";

export type ViewCheckboxFieldProps = { field: IBareCheckboxFieldModel };

const CheckboxField: React.FC<ViewCheckboxFieldProps> = ({ field }) => {
	return (
		<FormItemWrapper field={field}>
			<BaseCheckboxField field={field} />
		</FormItemWrapper>
	);
};
export default CheckboxField;
