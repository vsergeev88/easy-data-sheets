import type React from "react";
import type { IBareChoiceFieldModel } from "@/app/stores/bareStores/fields/bareChoiceFieldModel";

import BaseChoiceField from "@/components/baseFormItems/BaseChoiceField";

import FormItemWrapper from "./FormItemWrapper";

export type EditorChoiceFieldProps = {
	field: IBareChoiceFieldModel;
};

const ChoiceField: React.FC<EditorChoiceFieldProps> = ({ field }) => {
	return (
		<FormItemWrapper field={field}>
			<BaseChoiceField field={field} />
		</FormItemWrapper>
	);
};
export default ChoiceField;
