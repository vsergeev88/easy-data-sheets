import React from "react";
import { FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type BaseTextAreaFieldProps = {
	field: ControllerRenderProps<FieldValues, string>;
	placeholder?: string;
	disabled?: boolean;
};
const BaseTextAreaField: React.FC<BaseTextAreaFieldProps> = ({
	field,
	placeholder,
	disabled,
}) => {
	return (
		<FormControl>
			<Textarea
				{...field}
				placeholder={placeholder}
				className="h-full min-h-[80px] bg-white pr-10"
				disabled={disabled}
			/>
		</FormControl>
	);
};
export default BaseTextAreaField;
