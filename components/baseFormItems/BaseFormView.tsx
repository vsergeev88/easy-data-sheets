'use client'
import { FIELD_TYPES, Form } from "@/lib/types/form"
import { useForm } from "react-hook-form"
import {
  Form as FormComponent,
} from "@/components/ui/form"
import BaseFieldset, { type BaseFieldsetProps } from "./BaseFieldset"
import { Button } from "../ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { getFormDefaultValues, getFormSchema } from "./utils"
import { DEFAULT_FIELD_COMPONENTS_MAP } from "./constants"
import { FormSchema } from "./types"

export default function BaseFormView({
  formData,
  formName,
  fieldComponentsMap = DEFAULT_FIELD_COMPONENTS_MAP,
  Fieldset = BaseFieldset,
  onSubmit = () => { }
}: {
  formData: Form
  formName: string
  fieldComponentsMap: Record<FIELD_TYPES, React.FC>
  Fieldset: React.FC<BaseFieldsetProps>
  onSubmit?: (data: FormSchema) => void
}) {

  const form = useForm<FormSchema>({
    defaultValues: getFormDefaultValues(formData),
    resolver: zodResolver(getFormSchema(formData)),
  })

  return (
    <div className="p-4 max-w-[980px] mx-auto">
      <FormComponent {...form}>
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">{formName}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {formData.description}
        </p>
        <form onSubmit={onSubmit} className="space-y-8">
          {formData.fieldSets.map((fieldSet, index) => {
            return (
              <Fieldset key={index} legend={`${index + 1}. ${fieldSet.legend}`}>
                {fieldSet.fields.map((field) => {
                  const commonProps = {
                    control: form.control,
                  }
                  const FieldComponent = fieldComponentsMap[field.type]
                  return <FieldComponent key={field.name} {...commonProps} {...field} />
                })}
              </Fieldset>
            )
          })}
          <Button type="submit">Submit</Button>
        </form>
      </FormComponent>
    </div>
  )
}