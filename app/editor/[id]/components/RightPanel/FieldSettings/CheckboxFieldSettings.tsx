import { CheckboxField } from "@/lib/types/form"
import { FieldLabelSettings } from "./FieldLabelSettings"
import { Label } from "@/components/ui/label"

export const CheckboxFieldSettings = ({ field }: { field: CheckboxField }) => {
  return <div className="flex flex-col gap-4">
    <FieldLabelSettings field={field} />
    <div className="flex flex-col gap-2">
      <Label htmlFor="items" className="text-sm font-medium">Items</Label>
      {field.items.map((item) => (
        <div key={item} className="flex gap-2 items-center">
          {item}
        </div>
      ))}
    </div>
  </div>
}