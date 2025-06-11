import React from 'react'
import { useEditorStore } from '@/app/editor/stores/editorStore'
import { FieldSet } from '@/lib/types/form'
import { cn } from '@/lib/utils'
import { ClickOutside } from '@/components/ClickOutside'
import AddFieldsetButton from '../AddFieldsetButton'
import LegendEditable from './LegendEditable'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

type FieldsetProps = {
  children: React.ReactNode
  fieldSet: FieldSet
  className?: string
  index: number
}

const Fieldset: React.FC<FieldsetProps> = ({ children, fieldSet, className, index }) => {
  const { selectedFieldSetId, setSelectedFieldSetId, setSelectedFieldId, setLegend, removeFieldSet } = useEditorStore()
  const isSelected = selectedFieldSetId === fieldSet.id

  return (
    <ClickOutside onClickOutside={() => {
      setSelectedFieldSetId(null)
      setSelectedFieldId(null)
    }} ignoreClass='ignore-deselect' className='space-y-4'>
      <div
        onClick={() => {
          setSelectedFieldSetId(fieldSet.id)
          // setSelectedFieldId(null)
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
          {children}
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
