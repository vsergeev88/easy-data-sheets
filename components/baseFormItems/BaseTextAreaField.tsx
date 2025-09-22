import type React from "react";
import type { IBareTextFieldModel } from "@/app/stores/bareStores/fields/bareTextFieldModel";

import { observer } from "mobx-react-lite";

import { Textarea } from "@/components/ui/textarea";

type BaseTextAreaFieldProps = {
	field: IBareTextFieldModel;
};
const BaseTextAreaField: React.FC<BaseTextAreaFieldProps> = ({ field }) => {
	return (
		<Textarea
			className="h-full min-h-[80px] bg-white pr-10"
			disabled={field.disabled}
			onChange={(e) => {
				field.onChange?.(e);
			}}
			placeholder={field.placeholder}
			value={field.value ?? ""}
		/>
	);
};
export default observer(BaseTextAreaField);
