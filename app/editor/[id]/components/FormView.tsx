'use client'
import Fieldset from './formItems/Fieldset'
import { Form } from '@/lib/types/form'
import BaseFormView from '@/components/baseFormItems/BaseFormView'
import { FormSchema } from '@/components/baseFormItems/types'
import { useEditorStore } from '../../stores/editorStore'
import AddFieldsetButton from './AddFieldsetButton'
import { getFormSchema } from '@/components/baseFormItems/utils'
import { useForm } from 'react-hook-form'
import { getFormDefaultValues } from '@/components/baseFormItems/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form as FormComponent } from '@/components/ui/form'
import SubmitButton from './formItems/SubmitButton'

function onSubmit(values: FormSchema) {
  console.log(values)
}

const FieldSets = ({ formData }: { formData: Form }) => {
  const form = useForm<FormSchema>({
    defaultValues: getFormDefaultValues(formData),
    resolver: zodResolver(getFormSchema(formData)),
  })

  return (
    <FormComponent {...form}>
      <form onSubmit={onSubmit} className='space-y-4 overflow-y-auto'>
        {formData.fieldSets.map((fieldSet, index) => (
          <Fieldset key={fieldSet.id} fieldSet={fieldSet} index={index} control={form.control} />
        ))}
      </form>
    </FormComponent>
  )
}

export default function FormView() {
  const { formData, formInfo, selectedFieldSetId } = useEditorStore()

  if (!formData || !formInfo) return <div>Loading...</div>

  return (
    <BaseFormView>
      <h1 className='mb-4 text-center text-2xl font-bold md:text-left'>{formInfo.name}</h1>
      <p className='mb-4 text-sm text-gray-500'>{formData.description}</p>
      <FieldSets formData={formData} />
      {!selectedFieldSetId && <AddFieldsetButton />}
      <SubmitButton />
    </BaseFormView>
  )
}
