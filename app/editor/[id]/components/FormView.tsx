'use client'
import TextAreaField from "./formItems/TextAreaField"
import CheckboxField from "./formItems/CheckboxField"
import Fieldset from "./formItems/Fieldset"
import { FIELD_TYPES } from "@/lib/types/form";
import BaseFormView from "@/components/baseFormItems/BaseFormView"
import { DEFAULT_FIELD_COMPONENTS_MAP } from "@/components/baseFormItems/constants"
import { FormSchema } from "@/components/baseFormItems/types"
import { useEditorStore } from "../../stores/editorStore";
import AddFieldsetButton from "./AddFieldsetButton";

const EDITOR_FIELD_COMPONENTS_MAP: Record<FIELD_TYPES, React.FC<any>> = {
  ...DEFAULT_FIELD_COMPONENTS_MAP,
  [FIELD_TYPES.TEXT]: TextAreaField,
  [FIELD_TYPES.CHECKBOX]: CheckboxField,
}

function onSubmit(values: FormSchema) {
  console.log(values)
}

export default function FormView() {
  const { formData, formInfo, selectedFieldSetId } = useEditorStore()

  if (!formData) return <div>Loading...</div>

  return <BaseFormView
    formData={formData}
    formInfo={formInfo}
    onSubmit={onSubmit}
    // fieldComponentsMap={EDITOR_FIELD_COMPONENTS_MAP}
    // Fieldset={Fieldset}
    submitButtonProps={{
      type: "button",
      onClick: (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("submit")
      }
    }}
  >
    {(form) => {
      return (
        <>
          {formData.fieldSets.map((fieldSet, index) => (
            <Fieldset key={fieldSet.id} fieldSet={fieldSet} index={index}>
              {fieldSet.fields.map((field) => {
                const commonProps = {
                  control: form.control,
                }
                const FieldComponent = EDITOR_FIELD_COMPONENTS_MAP[field.type]
                return <FieldComponent key={field.name} {...commonProps} {...field} />
              })}
            </Fieldset>
          ))}
          {!selectedFieldSetId && <AddFieldsetButton />}
        </>)
    }}
  </BaseFormView>
}