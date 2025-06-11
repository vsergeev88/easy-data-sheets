import { Button } from '@/components/ui/button'
import { useEditorStore } from '../../stores/editorStore'

export default function AddFieldsetButton({ fieldSetId = null }: { fieldSetId?: string | null }) {
  const { addEmptySection } = useEditorStore()
  return (
    <Button
      variant='secondary'
      type='button'
      className='w-full'
      onClick={() => addEmptySection(fieldSetId)}
    >{`>>> Add new section here <<<`}</Button>
  )
}
