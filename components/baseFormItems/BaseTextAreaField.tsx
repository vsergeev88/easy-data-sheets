import type React from "react";
import type { ITextFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import { Textarea } from "@/components/ui/textarea";

type BaseTextAreaFieldProps = {
	field: ITextFieldModel;
};
const BaseTextAreaField: React.FC<BaseTextAreaFieldProps> = ({
	field,
}) => {
	return (
		// <FormControl>
		<Textarea
			value={field.value ?? ""}
			onChange={(e) => {
				field.onChange?.(e);
			}}
			placeholder={field.placeholder}
			className="h-full min-h-[80px] bg-white pr-10"
			disabled={field.disabled}
		/>
		// </FormControl>
	);
};
export default BaseTextAreaField;
