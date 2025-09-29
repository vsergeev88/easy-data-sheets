import { FIELD_TYPES } from "@/lib/types/form";

import ChoiceFieldSettings, {
  type ChoiceFieldSettingsProps,
} from "./ChoiceFieldSettings";
import {
  TextInputSettings,
  type TextInputSettingsProps,
} from "./TextInputFieldSettings";

export const fieldSettingsMap = {
  [FIELD_TYPES.TEXT]:
    TextInputSettings as React.ComponentType<TextInputSettingsProps>,
  [FIELD_TYPES.CHOICE]:
    ChoiceFieldSettings as React.ComponentType<ChoiceFieldSettingsProps>,
} as const;
