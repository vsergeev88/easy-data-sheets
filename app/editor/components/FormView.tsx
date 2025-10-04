"use client";
import type { IEditorFieldSetModel } from "../stores/editorAppStore/fieldSetModel";

import { useEditorAppStore } from "@editorAppStore";
import { observer } from "mobx-react-lite";

import BaseFormView from "@/components/baseFormItems/BaseFormView";
import { EditableText } from "@/components/EditableText";

import AddFieldsetButton from "./AddFieldsetButton";
import Fieldset from "./formItems/Fieldset";
import SubmitButton from "./formItems/SubmitButton";

function FormView() {
	const { formData, safeFormData, formInfo } = useEditorAppStore();

	if (!(formData && formInfo)) {
		return <div>Loading...</div>;
	}

	return (
		<BaseFormView>
			<EditableText
				className="mb-4 text-center font-bold text-2xl md:text-left"
				inputClassName="md:text-2xl font-bold"
				onBlur={(text) => formInfo.setName(text)}
				text={formInfo.name}
			/>
			<br />
			{safeFormData.description && (
				<EditableText
					className="mb-4 text-gray-500 text-sm"
					inputClassName="text-gray-500 text-sm"
					lines={3}
					onBlur={(text) => safeFormData.setDescription(text)}
					text={safeFormData.description}
				/>
			)}
			<form className="space-y-4 overflow-y-auto">
				{safeFormData.fieldSets.map((fieldSet, index) => {
					return (
						<Fieldset
							fieldSet={fieldSet as IEditorFieldSetModel}
							index={index}
							key={fieldSet.id}
						/>
					);
				})}
			</form>
			{!safeFormData.selectedFieldSetId && <AddFieldsetButton />}
			<SubmitButton />
		</BaseFormView>
	);
}

export default observer(FormView);
