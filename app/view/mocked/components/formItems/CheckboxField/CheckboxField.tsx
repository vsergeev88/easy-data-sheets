import React from 'react'

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import FormItemWrapper from '../../FormItemWrapper';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';

type CheckboxFieldProps = {
  form: UseFormReturn<any>
  label: string
  description?: string
  name: string
  items: {
    id: string
    label: string
  }[]
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ form, label, description, name, items }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItemWrapper field={field} label={label} description={description}>
          <div className="flex flex-col space-y-2 px-2 py-2 bg-white">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="items"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.id
                                )
                              )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
        </FormItemWrapper>
      )}
    />
  )
};
export default CheckboxField