import type React from "react";
import type { ITextFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import { FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

type BaseTextAreaFieldProps = {
	field: ITextFieldModel;
};
const BaseTextAreaField: React.FC<BaseTextAreaFieldProps> = ({
	field,
}) => {
	return (
		<FormControl>
			<Textarea
				{...field}
				placeholder={field.placeholder}
				className="h-full min-h-[80px] bg-white pr-10"
				disabled={field.disabled}
			/>
		</FormControl>
	);
};
export default BaseTextAreaField;
