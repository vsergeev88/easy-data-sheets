import React, { useState } from 'react'

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import FormItemWrapper from '../../FormItemWrapper';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';

type CheckboxFieldProps = {
  control: UseFormReturn<any>['control']
  label: string
  description?: string
  name: string
  items: {
    id: string
    label: string
  }[]
  withCustomField?: boolean
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ control, label, description, name, items, withCustomField }) => {
  const [otherValue, setOtherValue] = useState('');
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItemWrapper field={field} label={label} description={description}>
          <div className="flex flex-col space-y-2 px-2 py-2 bg-white">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={control}
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
            {withCustomField && <label className="flex flex-row items-center space-x-2">
              <Checkbox
                checked={!!otherValue}
              />
              <Input
                type="text"
                className="w-full"
                placeholder="Другое"
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
              />
            </label>}
          </div>
        </FormItemWrapper>
      )}
    />
  )
};
export default CheckboxField