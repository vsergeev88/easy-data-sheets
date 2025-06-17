import { Field, FIELD_TYPES } from "@/lib/types/form"
import { TextInputSettings } from "./TextInputFieldSettings"
import { CheckboxFieldSettings } from "./CheckboxFieldSettings"

export const fieldSettingsMap: Record<FIELD_TYPES, React.FC<{ field: Field }>> = {
  [FIELD_TYPES.TEXT]: TextInputSettings,
  [FIELD_TYPES.CHECKBOX]: CheckboxFieldSettings,
}