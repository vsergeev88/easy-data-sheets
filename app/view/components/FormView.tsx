"use client";
import type { FormSchema } from "@/components/baseFormItems/types";
import type { IViewFieldSetModel } from "../stores/viewAppStore/fieldSetModel";

import { toast } from "sonner";

import BaseFormView from "@/components/baseFormItems/BaseFormView";

import { useViewAppStore } from "../hooks/useViewAppStore";
import Fieldset from "./formItems/Fieldset";
import SubmitButton from "./formItems/SubmitButton";

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

export default function FormView() {
	const { formData, formInfo } = useViewAppStore();

	if (!(formData && formInfo)) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<BaseFormView>
				<h1 className="mb-4 text-center font-bold text-2xl md:text-left">
					{formInfo.name}
				</h1>
				<p className="mb-4 text-gray-500 text-sm">{formData.description}</p>
				<form className="space-y-4 overflow-y-auto" onSubmit={onSubmit}>
					{formData.fieldSets.map((fieldSet, index) => (
						<Fieldset
							fieldSet={fieldSet as IViewFieldSetModel}
							index={index}
							key={fieldSet.id}
						/>
					))}
				</form>
				<SubmitButton />
				{/* <p className="text-center text-gray-500 text-xs">
					Powered by EasyDataSheets.com
				</p> */}
			</BaseFormView>
		</>
	);
}
