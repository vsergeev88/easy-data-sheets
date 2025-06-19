import React from "react";
import BaseFormItemWrapper from "@/components/baseFormItems/BaseFormItemWrapper";

type FormItemProps = {
	children: React.ReactNode;
	label: string;
	description?: string;
};

const FormItemWrapper: React.FC<FormItemProps> = ({
	children,
	label,
	description,
}) => {
	return (
		<BaseFormItemWrapper label={label} description={description}>
			{children}
		</BaseFormItemWrapper>
	);
};

export default FormItemWrapper;
