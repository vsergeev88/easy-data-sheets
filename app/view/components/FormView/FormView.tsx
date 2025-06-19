"use client";
import { toast } from "sonner";
import TextAreaField from "../formItems/TextAreaField";
import CheckboxField from "../formItems/CheckboxField";
import Fieldset from "../formItems/Fieldset";
import { FIELD_TYPES } from "@/lib/types/form";
import type { Form } from "@/lib/types/form";
import BaseFormView from "@/components/baseFormItems/BaseFormView";
import { DEFAULT_FIELD_COMPONENTS_MAP } from "@/components/baseFormItems/constants";
import { FormSchema } from "@/components/baseFormItems/types";

const VIEWER_FIELD_COMPONENTS_MAP: Record<FIELD_TYPES, React.FC<any>> = {
	...DEFAULT_FIELD_COMPONENTS_MAP,
	[FIELD_TYPES.TEXT]: TextAreaField,
	[FIELD_TYPES.CHECKBOX]: CheckboxField,
};

function onSubmit(values: FormSchema) {
	console.log(values);
	toast("You submitted the following values:", {
		description: (
			<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
				<code className="text-white">{JSON.stringify(values, null, 2)}</code>
			</pre>
		),
	});
}

export default function FormView({ formData, formInfo }: { formData: Form }) {
	return (
		<BaseFormView
			formData={formData}
			formInfo={formInfo}
			onSubmit={onSubmit}
			fieldComponentsMap={VIEWER_FIELD_COMPONENTS_MAP}
			Fieldset={Fieldset}
		/>
	);
}
