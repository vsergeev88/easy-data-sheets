import { ServiceButton } from "@/components/ServiceButton"
import { useEditorStore } from "@editorStore/editorStore"
import { X } from "lucide-react"
import { fieldSettingsMap } from "./fieldSettingsMap"

export const FieldSettings = ({ fieldId }: { fieldId: string | null }) => {
  const { formData, setSelectedFieldId } = useEditorStore()
  const field = formData?.fieldSets.find(fieldSet => fieldSet.fields.some(field => field.id === fieldId))?.fields.find(field => field.id === fieldId)

  if (!field) return null

  console.log(field)

  const FieldSettingsComponent = fieldSettingsMap[field.type]

  return <div className="p-4 bg-background border-gray-200 border">
    <div className="flex items-center justify-between text-lg font-medium">
      <h2>Settings</h2>
      <ServiceButton icon={<X />} tooltip="Close" onClick={() => {
        setSelectedFieldId(null)
      }} />
    </div>
    <div className="mt-4">
      <FieldSettingsComponent field={field} />
    </div>
  </div>
}