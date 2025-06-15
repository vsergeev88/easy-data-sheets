import React, { useMemo, useEffect } from 'react'
import { useEditorStore } from '@/app/editor/stores/editorStore'
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

type FieldsetProps = {
  fieldSet: FieldSet
  className?: string
  index: number
  control: Control<any>
}

const Fieldset: React.FC<FieldsetProps> = ({ fieldSet, className, index, control }) => {
  const { selectedFieldSetId, setSelectedFieldSetId, setSelectedFieldId, setLegend, removeFieldSet, reorderFields } = useEditorStore()
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
          <LegendEditable
            legend={fieldSet.legend ?? ''}
            index={index}
            setLegend={legend => setLegend(fieldSet.id, legend)}
            className='pr-10'
          />
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
            <Button variant='link' size='sm' className='flex items-center gap-2 text-gray-500'><CornerDownRight /> Add field </Button>
            <Button variant='link' size='sm' className='flex items-center gap-2 text-gray-500'><CornerDownRight /> Use section template </Button>
          </div>}
          {isSelected && <div className='absolute top-0 right-0 flex flex-row items-center justify-between'>
            <Button onClick={() => removeFieldSet(fieldSet.id)}
              size='icon'
              variant='ghost'>
              <Trash2 />
            </Button>
          </div>}
        </fieldset>
      </div>
      {isSelected && <AddFieldsetButton fieldSetId={fieldSet.id} />}
    </ClickOutside>
  )
}
export default Fieldset
