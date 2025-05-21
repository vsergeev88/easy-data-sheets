import React from 'react'
import { CheckboxField as CheckboxFieldType } from '@/lib/types/form';
import { FormLabel, FormControl, FormItem, FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import CustomField from './CustomField';

type BaseCheckboxFieldProps = Omit<CheckboxFieldType, 'type' | 'label'> & {
  control?: UseFormReturn['control']
  onAddOtherValue?: (otherValue: string) => void
}

const BaseCheckboxField: React.FC<BaseCheckboxFieldProps> = ({ control, withCustomField, items, onAddOtherValue, name }) => {
  return (
    <div className="flex flex-col space-y-2 px-2 py-2 bg-white w-full">
      {items.map((item) => (
        <FormField
          key={item}
          control={control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem
                key={item}
                className="flex flex-row items-start space-x-3 space-y-0 w-full"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item])
                        : field.onChange(
                          field.value?.filter(
                            (value: string) => value !== item
                          )
                        )
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {item}
                </FormLabel>
              </FormItem>
            )
          }}
        />
      ))}
      {withCustomField && <CustomField onAddOtherValue={onAddOtherValue} />}
    </div>
  )
};
export default BaseCheckboxField