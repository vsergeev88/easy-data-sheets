import React from 'react'
import FormItemWrapper from './FormItemWrapper'
import { FormField } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import BaseTextAreaField from '@/components/baseFormItems/BaseTextAreaField'
import { TextField } from '@/lib/types/form'

type TextAreaFieldProps = TextField & {
  control?: UseFormReturn['control']
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ control, id, name, label, description, required }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItemWrapper label={label} description={description} fieldId={id} required={required}>
          <BaseTextAreaField field={field} />
        </FormItemWrapper>
      )}
    />
  )
}
export default TextAreaField
