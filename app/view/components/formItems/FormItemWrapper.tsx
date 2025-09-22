import type React from "react";
import type { IBareFieldModel } from "@/app/stores/bareStores/bareFieldModel";
import BaseFormItemWrapper from "@/components/baseFormItems/BaseFormItemWrapper";

type FormItemProps = {
	field: IBareFieldModel;
	children: React.ReactNode;
};

const FormItemWrapper: React.FC<FormItemProps> = ({ field, children }) => {
	return <BaseFormItemWrapper field={field}>{children}</BaseFormItemWrapper>;
};

export default FormItemWrapper;
