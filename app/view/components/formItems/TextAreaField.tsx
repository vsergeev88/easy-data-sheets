import React from "react";
import FormItemWrapper from "./FormItemWrapper";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import BaseTextAreaField from "@/components/baseFormItems/BaseTextAreaField";

type TextAreaFieldProps = {
	control: UseFormReturn["control"];
	label: string;
	description?: string;
	name: string;
	placeholder?: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
	control,
	label,
	description,
	name,
	placeholder,
}) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItemWrapper label={label} description={description}>
					<BaseTextAreaField field={field} placeholder={placeholder} />
				</FormItemWrapper>
			)}
		/>
	);
};
export default TextAreaField;
