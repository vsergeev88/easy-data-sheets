import React from 'react'
import FormItemWrapper from '../../FormItemWrapper';
import { FormControl, FormField } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';

type TextAreaFieldProps = {
  form: UseFormReturn<any>
  label: string
  description?: string
  name: string
  placeholder?: string
}
const TextAreaField: React.FC<TextAreaFieldProps> = ({ form, label, description, name, placeholder }) => {
  return (<FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItemWrapper field={field} label={label} description={description}>
        <FormControl>
          <Textarea {...field} placeholder={placeholder} className="h-full pr-10 min-h-[80px] bg-white" />
        </FormControl>
      </FormItemWrapper>
    )}
  />
  )
};
export default TextAreaField