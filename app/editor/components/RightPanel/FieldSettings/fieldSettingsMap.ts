import type { IEditorFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";

import { FIELD_TYPES } from "@/lib/types/form";

import CheckboxFieldSettings, {
  type CheckboxFieldSettingsProps,
} from "./CheckboxFieldSettings";
import { TextInputSettings } from "./TextInputFieldSettings";

export const fieldSettingsMap: Record<
  FIELD_TYPES,
  React.ComponentType<{ field: IEditorFieldModel }>
> = {
  [FIELD_TYPES.TEXT]: TextInputSettings,
  [FIELD_TYPES.CHECKBOX]:
    CheckboxFieldSettings as React.ComponentType<CheckboxFieldSettingsProps>,
};
