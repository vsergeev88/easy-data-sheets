import React from 'react'
import { FormControl } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

type BaseTextAreaFieldProps = {
  field: ControllerRenderProps<FieldValues, string>
  placeholder?: string
}
const BaseTextAreaField: React.FC<BaseTextAreaFieldProps> = ({ field, placeholder }) => {
  return (
    <FormControl>
      <Textarea {...field} placeholder={placeholder} className="h-full pr-10 min-h-[80px] bg-white" />
    </FormControl>
  )
};
export default BaseTextAreaField