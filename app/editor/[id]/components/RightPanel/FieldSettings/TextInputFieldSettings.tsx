import { Field } from "@/lib/types/form"
import { FieldLabelSettings } from "./FieldLabelSettings"

export const TextInputSettings = ({ field }: { field: Field }) => {
  return <div>
    <FieldLabelSettings field={field} />

  </div>
}