import { FIELD_TYPES } from "@/lib/types/form";

import CheckboxFieldSettings, {
  type CheckboxFieldSettingsProps,
} from "./CheckboxFieldSettings";
import {
  TextInputSettings,
  type TextInputSettingsProps,
} from "./TextInputFieldSettings";

export const fieldSettingsMap = {
  [FIELD_TYPES.TEXT]:
    TextInputSettings as React.ComponentType<TextInputSettingsProps>,
  [FIELD_TYPES.CHECKBOX]:
    CheckboxFieldSettings as React.ComponentType<CheckboxFieldSettingsProps>,
} as const;
