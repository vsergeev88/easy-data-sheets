'use client'
// import { toast } from "sonner"
import TextAreaField from "./formItems/TextAreaField"
import CheckboxField from "./formItems/CheckboxField"
import Fieldset from "./formItems/Fieldset"
import { FIELD_TYPES } from "@/lib/types/form";
import type { Form } from "@/lib/types/form";
import BaseFormView from "@/components/baseFormItems/BaseFormView"
import { DEFAULT_FIELD_COMPONENTS_MAP } from "@/components/baseFormItems/constants"
import { FormSchema } from "@/components/baseFormItems/types"
import { useEditorStore } from "../../stores/editorStore";

const EDITOR_FIELD_COMPONENTS_MAP: Record<FIELD_TYPES, React.FC<any>> = {
  ...DEFAULT_FIELD_COMPONENTS_MAP,
  [FIELD_TYPES.TEXT]: TextAreaField,
  [FIELD_TYPES.CHECKBOX]: CheckboxField,
}

function onSubmit(values: FormSchema) {
  console.log(values)
}

export default function FormView() {
  const { formData, formName } = useEditorStore()

  if (!formData) return null

  return <BaseFormView
    formData={formData}
    formName={formName}
    onSubmit={onSubmit}
    fieldComponentsMap={EDITOR_FIELD_COMPONENTS_MAP}
    Fieldset={Fieldset}
  />
}