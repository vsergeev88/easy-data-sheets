import React, { useState } from 'react'

import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { FormField } from '@/components/ui/form';
import FormItemWrapper from '../../FormItemWrapper';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { CheckboxField as CheckboxFieldType } from '@/lib/types/form';

type CheckboxFieldProps = CheckboxFieldType & {
  control: UseFormReturn<any>['control']
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ control, label, description, name, items, withCustomField }) => {
  const [otherValue, setOtherValue] = useState('');
  const [otherValues, setOtherValues] = useState<string[]>([]);
  const form = useFormContext();

  const renderCheckboxItems = (items: string[]) => {
    return items.map((item) => (
      <FormField
        key={item}
        control={control}
        name="items"
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
    ))
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const addOtherValue = () => {
          setOtherValues(Array.from(new Set([...otherValues, otherValue])));
          form.setValue(name, [...field.value, otherValue]);
          setOtherValue('');
        }

        return (
          <FormItemWrapper field={field} label={label} description={description}>
            <div className="flex flex-col space-y-2 px-2 py-2 bg-white w-full">
              {renderCheckboxItems(items)}
              {renderCheckboxItems(otherValues)}
              {
                withCustomField && <div className="flex flex-row items-center space-x-2 w-full">
                  {
                    withCustomField && <div className="flex flex-row items-center space-x-2 w-full">
                      <div className="flex w-full items-center space-x-2">
                        <Input type="text" placeholder="Другое" value={otherValue} className="max-w-lg"
                          onChange={(e) => setOtherValue(e.target.value)} />
                        <Button variant="outline" type="button" onClick={addOtherValue}><PlusIcon /> Добавить</Button>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </FormItemWrapper>
        )
      }
      }
    />
  )
};
export default CheckboxField