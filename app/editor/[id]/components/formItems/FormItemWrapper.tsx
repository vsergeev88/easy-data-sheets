import { Trash2 } from 'lucide-react'
import React from 'react'

import { useEditorStore } from '@/app/editor/stores/editorStore'
import BaseFormItemWrapper from '@/components/baseFormItems/BaseFormItemWrapper'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FormItemProps = {
  children: React.ReactNode
  description?: string
  fieldId: string
  label: string
}

const FormItemWrapper: React.FC<FormItemProps> = ({ children, description, fieldId, label }) => {
  const { removeField, selectedFieldId, setSelectedFieldId } = useEditorStore()
  const isSelectedField = selectedFieldId === fieldId

  console.log('isSelectedField', isSelectedField)

  const handleClick = () => {
    console.log('clicked', fieldId)
    setSelectedFieldId(fieldId)
  }

  return (
    <div
      className={cn('relative', { 'border-2 border-blue-500 border-dotted': isSelectedField })}
      onClick={handleClick}
    >
      <BaseFormItemWrapper description={description}
        focusable={false}
        label={label}>
        <div className='absolute top-0 right-0 flex flex-row items-center justify-between'>
          <Button onClick={() => removeField(fieldId)}
            size='icon'
            variant='ghost'>
            <Trash2 />
          </Button>
        </div>
        <div className='pointer-events-none cursor-default select-none'>{children}</div>
      </BaseFormItemWrapper>
    </div>
  )
}

export default FormItemWrapper
