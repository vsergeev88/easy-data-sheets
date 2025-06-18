import { FieldLabelSettings } from "./FieldLabelSettings"
import { ITextFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel"

export const TextInputSettings = ({ field }: { field: ITextFieldModel }) => {
  return <div>
    <FieldLabelSettings field={field} />

  </div>
}