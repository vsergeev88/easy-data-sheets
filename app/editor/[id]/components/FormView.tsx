'use client'
import TextAreaField from "./formItems/TextAreaField"
import CheckboxField from "./formItems/CheckboxField"
import Fieldset from "./formItems/Fieldset"
import { FIELD_TYPES, Form } from "@/lib/types/form";
import BaseFormView from "@/components/baseFormItems/BaseFormView"
import { DEFAULT_FIELD_COMPONENTS_MAP } from "@/components/baseFormItems/constants"
import { FormSchema } from "@/components/baseFormItems/types"
import { useEditorStore } from "../../stores/editorStore";
import AddFieldsetButton from "./AddFieldsetButton";
import { getFormSchema } from "@/components/baseFormItems/utils";
import { useForm } from "react-hook-form";
import { getFormDefaultValues } from "@/components/baseFormItems/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FALLBACK_FORM_DATA } from "../../stores/fallbackFormData";
import { Button } from "@/components/ui/button";
import {
  Form as FormComponent,
} from "@/components/ui/form"
const EDITOR_FIELD_COMPONENTS_MAP: Record<FIELD_TYPES, React.FC<any>> = {
  ...DEFAULT_FIELD_COMPONENTS_MAP,
  [FIELD_TYPES.TEXT]: TextAreaField,
  [FIELD_TYPES.CHECKBOX]: CheckboxField,
}

function onSubmit(values: FormSchema) {
  console.log(values)
}

const FieldSets = ({ formData }: { formData: Form }) => {
  const form = useForm<FormSchema>({
    defaultValues: getFormDefaultValues(formData),
    resolver: zodResolver(getFormSchema(formData)),
  })

  return <FormComponent {...form}>
    <form onSubmit={onSubmit} className="space-y-4">
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
    </form>
  </FormComponent>
}

export default function FormView() {
  const { formData, formInfo, selectedFieldSetId } = useEditorStore()

  if (!formData || !formInfo) return <div>Loading...</div>

  return <BaseFormView>
    <h1 className="text-2xl font-bold mb-4 text-center md:text-left">{formInfo.name}</h1>
    <p className="text-sm text-gray-500 mb-4">
      {formData.description}
    </p>
    <FieldSets formData={formData} />
    {!selectedFieldSetId && <AddFieldsetButton />}
    <Button type="submit">Submit</Button>
  </BaseFormView>
}