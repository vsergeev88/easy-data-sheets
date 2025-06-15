import React, { useMemo, useEffect } from 'react'
import { addTextInput, useEditorStore } from '@/app/editor/stores/editorStore'
import { Field, FieldSet } from '@/lib/types/form'
import { cn } from '@/lib/utils'
import { ClickOutside } from '@/components/ClickOutside'
import AddFieldsetButton from '../AddFieldsetButton'
import LegendEditable from './LegendEditable'
import { Button } from '@/components/ui/button'
import { CornerDownRight, Trash2 } from 'lucide-react'
import { Control } from 'react-hook-form'
import { EDITOR_FIELD_COMPONENTS_MAP } from './editorFieldComponentsMap'
import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import { ServiceButton } from '@/components/ServiceButton'

type FieldsetProps = {
  fieldSet: FieldSet
  className?: string
  index: number
  control: Control<any>
}

const Fieldset: React.FC<FieldsetProps> = ({ fieldSet, className, index, control }) => {
  const { selectedFieldSetId, setSelectedFieldSetId,
    setSelectedFieldId, setLegend,
    removeFieldSet, reorderFields, moveField, getIsSingleFieldSet, addEmptySection } = useEditorStore()
  const isSelected = selectedFieldSetId === fieldSet.id

  const fieldsetFields = useMemo(() => fieldSet.fields, [fieldSet.fields])

  const [parent, fields, setValues] = useDragAndDrop<HTMLDivElement, Field>(fieldsetFields, {
    onSort: (data) => {
      reorderFields(fieldSet.id, data.values as Field[])
    }
  })

  useEffect(() => {
    setValues(fieldsetFields)
  }, [fieldsetFields, setValues])

  return (
    <ClickOutside onClickOutside={() => {
      setSelectedFieldSetId(null)
      setSelectedFieldId(null)
    }} ignoreClass='ignore-deselect' className='space-y-4'>
      <div
        onClick={() => {
          setSelectedFieldSetId(fieldSet.id)
        }}
        className={cn('border-2 border-dashed border-transparent', {
          'border-blue-500': isSelected,
          'hover:border-blue-500/50': !isSelected,
        })}
      >
        <fieldset
          className={cn('relative border border-gray-300 bg-gray-300 p-4 px-1 py-1', className)}
        >
          <div className='flex flex-row items-center justify-between min-h-10 gap-4 my-1'>
            <LegendEditable
              legend={fieldSet.legend ?? ''}
              index={index}
              setLegend={legend => setLegend(fieldSet.id, legend)}
              className='max-w-prose'
            />
            {isSelected && <div className='flex flex-row items-center justify-between'>
              <ServiceButton
                onClick={() => {
                  if (getIsSingleFieldSet()) {
                    addEmptySection()
                  }
                  removeFieldSet(fieldSet.id)
                }}
                icon={<Trash2 />}
                tooltip='Delete section'
                className='bg-transparent'
              />
            </div>}
          </div>
          {fields.length > 0 ? (
            <div ref={parent} className=''>
              {fields.map(field => {
                const commonProps = { control }
                const FieldComponent = EDITOR_FIELD_COMPONENTS_MAP[field.type] as React.FC<any>
                return (
                  <FieldComponent key={field.id} data-label={field.id} {...commonProps} {...field} />
                )
              })}
            </div>
          ) : <div className='flex flex-col items-start'>
            <div className='flex items-center gap-2 text-gray-500 text-sm mb-2'>
              <CornerDownRight className='w-4 h-4' />
              <div className='flex items-center'>
                Start with adding &nbsp;
                <Button variant='link' size='sm' className='text-gray-500 p-0 underline underline-offset-4 cursor-pointer hover:text-gray-700'
                  onClick={() => addTextInput(fieldSet.id)}
                >
                  Text Input
                </Button>
                &nbsp;or other basic elements from the left panel
              </div>
            </div>
            <div className='flex items-center gap-2 text-gray-500 text-sm'>
              <CornerDownRight className='w-4 h-4' />
              <Button variant='link' size='sm' className='p-0 underline underline-offset-4 cursor-pointer text-gray-500 hover:text-gray-700'>Use section template </Button>
            </div>
          </div>}
        </fieldset>
      </div>
      {isSelected && <AddFieldsetButton fieldSetId={fieldSet.id} />}
    </ClickOutside>
  )
}
export default Fieldset
