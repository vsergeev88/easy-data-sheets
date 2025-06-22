import { FIELD_TYPES } from "@/lib/types/form";
import CheckboxFieldSettings from "./CheckboxFieldSettings";
import SubmitButtonSettings from "./SubmitButtonSettings";
import { TextInputSettings } from "./TextInputFieldSettings";

export const fieldSettingsMap = {
	[FIELD_TYPES.TEXT]: TextInputSettings,
	[FIELD_TYPES.CHECKBOX]: CheckboxFieldSettings,
	'submit-button': SubmitButtonSettings,
} as const;
