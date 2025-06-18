'use client'
import Fieldset from './formItems/Fieldset'
import { Form } from '@/lib/types/form'
import BaseFormView from '@/components/baseFormItems/BaseFormView'
import { FormSchema } from '@/components/baseFormItems/types'
import { useEditorAppStore } from '@editorAppStore'
import AddFieldsetButton from './AddFieldsetButton'
import { getFormSchema } from '@/components/baseFormItems/utils'
import { useForm } from 'react-hook-form'
import { getFormDefaultValues } from '@/components/baseFormItems/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form as FormComponent } from '@/components/ui/form'
import SubmitButton from './formItems/SubmitButton'
import { observer } from 'mobx-react-lite'
import { IFormDataModel } from '../../stores/editorAppStore/formDataModel'

function onSubmit(values: FormSchema) {
  console.log(values)
}

const FieldSets = ({ formData }: { formData: IFormDataModel }) => {
  // TODO get rid of react-hook-form
  const form = useForm<FormSchema>({
    defaultValues: getFormDefaultValues(formData as Form),
    resolver: zodResolver(getFormSchema(formData as Form)),
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

function FormView() {
  const { formData, formInfo } = useEditorAppStore()

  if (!formData || !formInfo) return <div>Loading...</div>

  return (
    <BaseFormView>
      <h1 className='mb-4 text-center text-2xl font-bold md:text-left'>{formInfo.name}</h1>
      <p className='mb-4 text-sm text-gray-500'>{formInfo.description}</p>
      <FieldSets formData={formData} />
      {!formData.selectedFieldSetId && <AddFieldsetButton />}
      <SubmitButton />
    </BaseFormView>
  )
}

export default observer(FormView)
