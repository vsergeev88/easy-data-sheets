"use client";
import type { FormSchema } from "@/components/baseFormItems/types";

import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";

import BaseFormView from "@/components/baseFormItems/BaseFormView";

import AddFieldsetButton from "./AddFieldsetButton";
import Fieldset from "./formItems/Fieldset";
import SubmitButton from "./formItems/SubmitButton";

function FormView() {
	const { formData, formInfo } = useEditorAppStore();

	if (!(formData && formInfo)) {
		return <div>Loading...</div>;
	}

	function onSubmit(values: FormSchema) {
		console.log(values);
	}

	return (
		<BaseFormView>
			<h1 className="mb-4 text-center font-bold text-2xl md:text-left">
				{formInfo.name}
			</h1>
			<p className="mb-4 text-gray-500 text-sm">{formData.description}</p>
			<form className="space-y-4 overflow-y-auto" onSubmit={onSubmit}>
				{formData.fieldSets.map((fieldSet, index) => (
					<Fieldset fieldSet={fieldSet} index={index} key={fieldSet.id} />
				))}
			</form>
			{!formData.selectedFieldSetId && <AddFieldsetButton />}
			<SubmitButton />
		</BaseFormView>
	);
}

export default observer(FormView);
