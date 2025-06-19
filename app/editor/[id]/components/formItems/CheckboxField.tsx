import React from "react";
import { FormField } from "@/components/ui/form";
import FormItemWrapper from "./FormItemWrapper";
import { UseFormReturn } from "react-hook-form";
import { CheckboxField as CheckboxFieldType } from "@/lib/types/form";
import BaseCheckboxField from "@/components/baseFormItems/BaseCheckboxField";

type CheckboxFieldProps = CheckboxFieldType & {
	control: UseFormReturn["control"];
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
	control,
	label,
	description,
	name,
	items,
	withCustomField,
	id,
	required,
}) => {
	// const [otherValues, setOtherValues] = useState<string[]>([]);
	// const form = useFormContext();

	return (
		<FormField
			control={control}
			name={name}
			render={() => {
				// const addOtherValue = (otherValue: string) => {
				//   // setOtherValues(Array.from(new Set([...otherValues, otherValue])));
				//   // form.setValue(name, [...field.value, otherValue]);
				// }

				return (
					<FormItemWrapper
						label={label}
						description={description}
						fieldId={id}
						required={required}
					>
						<BaseCheckboxField
							id={id}
							control={control}
							withCustomField={withCustomField}
							// onAddOtherValue={addOtherValue}
							items={items}
							name={name}
						/>
					</FormItemWrapper>
				);
			}}
		/>
	);
};
export default CheckboxField;
