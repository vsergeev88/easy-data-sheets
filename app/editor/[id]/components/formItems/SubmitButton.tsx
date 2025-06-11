import { useEditorStore } from '@/app/editor/stores/editorStore'
import BaseSubmitButton from '@/components/baseFormItems/BaseSubmitButton'
import { cn } from '@/lib/utils'

export default function SubmitButton() {
  const { selectedFieldId, setSelectedFieldId, setSelectedFieldSetId, selectedFieldSetId } = useEditorStore()
  const isSelected = selectedFieldId === 'submit-button' && !selectedFieldSetId

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedFieldId('submit-button')
    setSelectedFieldSetId(null)
  }

  return (
    <div className={cn('border-2 border-dotted border-transparent', {
      'border-blue-500': isSelected,
      'hover:border-blue-500/50': !isSelected,
    })} onClick={handleClick}>
      <BaseSubmitButton />
    </div>
  )
}