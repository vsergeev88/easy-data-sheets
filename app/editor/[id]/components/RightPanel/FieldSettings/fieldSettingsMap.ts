import { FIELD_TYPES } from "@/lib/types/form";
import CheckboxFieldSettings from "./CheckboxFieldSettings";
import { TextInputSettings } from "./TextInputFieldSettings";

export const fieldSettingsMap = {
	[FIELD_TYPES.TEXT]: TextInputSettings,
	[FIELD_TYPES.CHECKBOX]: CheckboxFieldSettings,
} as const;
