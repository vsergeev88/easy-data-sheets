import { Button } from '@/components/ui/button'
import { useEditorStore } from '../../stores/editorStore'
import { Plus } from 'lucide-react'

export default function AddFieldsetButton({ fieldSetId = null }: { fieldSetId?: string | null }) {
  const { addEmptySection } = useEditorStore()
  return (
    <div className='flex items-center gap-2 cursor-pointer w-full border-2 border-dashed border-gray-200 hover:border-gray-300 p-2 text-lg font-medium text-gray-400 hover:text-gray-500 bg-gray-100 hover:bg-gray-200'
      onClick={() => addEmptySection(fieldSetId)}
    >
      <Plus className='w-4 h-4' />
      <span className=''>New Section</span>
    </div>
  )
}
