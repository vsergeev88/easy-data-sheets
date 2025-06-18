import { Field, FIELD_TYPES } from "@/lib/types/form"
import { TextInputSettings } from "./TextInputFieldSettings"
import { CheckboxFieldSettings } from "./CheckboxFieldSettings"
import { IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel"

export const fieldSettingsMap: Record<FIELD_TYPES, React.FC<{ field: IFieldModel }>> = {
  [FIELD_TYPES.TEXT]: TextInputSettings,
  [FIELD_TYPES.CHECKBOX]: CheckboxFieldSettings,
}