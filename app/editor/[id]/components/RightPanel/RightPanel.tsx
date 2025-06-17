import { useEditorStore } from "@editorStore/"
import { FieldSettings } from "./FieldSettings/"

const RightPanel = () => {
  const { formData, selectedFieldId } = useEditorStore()

  return <div className='h-full py-4 px-2 ignore-deselect'>
    <FieldSettings fieldId={selectedFieldId} />
  </div>
}

export default RightPanel