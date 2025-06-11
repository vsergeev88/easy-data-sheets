import { Trash2 } from 'lucide-react'
import React from 'react'

import { useEditorStore } from '@/app/editor/stores/editorStore'
import BaseFormItemWrapper from '@/components/baseFormItems/BaseFormItemWrapper'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ClickOutside } from '@/components/ClickOutside'

type FormItemProps = {
  children: React.ReactNode
  description?: string
  fieldId: string
  label: string
}

const FormItemWrapper: React.FC<FormItemProps> = ({ children, description, fieldId, label }) => {
  const { removeField, selectedFieldId, setSelectedFieldId } = useEditorStore()
  const isSelected = selectedFieldId === fieldId

  const handleClick = () => {
    setSelectedFieldId(fieldId)
  }

  return (
    <ClickOutside onClickOutside={() => setSelectedFieldId(null)} ignoreClass='ignore-deselect'>
      <div
        className={cn('border-2 border-dotted border-transparent', {
          'border-blue-500': isSelected,
          'hover:border-blue-500/50': !isSelected,
        })}
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
    </ClickOutside>
  )
}

export default FormItemWrapper
