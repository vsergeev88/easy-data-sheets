"use client";
import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";
import BaseFormView from "@/components/baseFormItems/BaseFormView";
import type { FormSchema } from "@/components/baseFormItems/types";
import type { IFormDataModel } from "../../stores/editorAppStore/formDataModel";
import AddFieldsetButton from "./AddFieldsetButton";
import Fieldset from "./formItems/Fieldset";
import SubmitButton from "./formItems/SubmitButton";

function onSubmit(values: FormSchema) {
	console.log(values);
}

const FieldSets = ({ formData }: { formData: IFormDataModel }) => {
	return (
		<form onSubmit={onSubmit} className="space-y-4 overflow-y-auto">
			{formData.fieldSets.map((fieldSet, index) => (
				<Fieldset
					key={fieldSet.id}
					fieldSet={fieldSet}
					index={index}
				/>
			))}
		</form>
	);
};

function FormView() {
	const { formData, formInfo } = useEditorAppStore();

	if (!formData || !formInfo) return <div>Loading...</div>;

	return (
		<BaseFormView>
			<h1 className="mb-4 text-center text-2xl font-bold md:text-left">
				{formInfo.name}
			</h1>
			<p className="mb-4 text-sm text-gray-500">{formData.description}</p>
			<FieldSets formData={formData} />
			{!formData.selectedFieldSetId && <AddFieldsetButton />}
			<SubmitButton />
		</BaseFormView>
	);
}

export default observer(FormView);
