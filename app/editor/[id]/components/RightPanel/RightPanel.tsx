import { useEditorAppStore } from '@editorAppStore'
import { FieldSettings } from "./FieldSettings/"

const RightPanel = () => {
  const { safeFormData } = useEditorAppStore()

  return <div className='h-full py-4 px-2 ignore-deselect'>
    <FieldSettings fieldId={safeFormData.selectedFieldId} />
  </div>
}

export default RightPanel