import type React from "react";
import type { IBareChoiceFieldModel } from "@/app/stores/bareStores/fields/bareChoiceFieldModel";

import BaseChoiceField from "@/components/baseFormItems/BaseChoiceField";

import FormItemWrapper from "./FormItemWrapper";

export type ViewChoiceFieldProps = { field: IBareChoiceFieldModel };

const ChoiceField: React.FC<ViewChoiceFieldProps> = ({ field }) => {
	return (
		<FormItemWrapper field={field}>
			<BaseChoiceField field={field} />
		</FormItemWrapper>
	);
};
export default ChoiceField;
