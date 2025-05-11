import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { CheckboxField as CheckboxFieldType } from '@/lib/types/form';
import { FormLabel } from '../ui/form';
import { FormControl } from '../ui/form';
import { FormItem } from '../ui/form';
import { FormField } from '../ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';

type BaseCheckboxFieldProps = Omit<CheckboxFieldType, 'type' | 'label'> & {
  control?: UseFormReturn['control']
  onAddOtherValue?: (otherValue: string) => void
}

const BaseCheckboxField: React.FC<BaseCheckboxFieldProps> = ({ control, withCustomField, items, onAddOtherValue, name }) => {
  const [otherValue, setOtherValue] = useState('');

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
      {withCustomField && <div className="flex flex-row items-center space-x-2 w-full">
        <div className="flex w-full items-center space-x-2">
          <Input type="text" placeholder="Other" value={otherValue} className="max-w-lg"
            onChange={(e) => setOtherValue(e.target.value)} />
          <Button variant="outline" type="button" disabled={!otherValue} onClick={() => {
            onAddOtherValue?.(otherValue)
            setOtherValue('')
          }}><PlusIcon /> Add</Button>
        </div>
      </div>
      }
    </div>
  )
};
export default BaseCheckboxField