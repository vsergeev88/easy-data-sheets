import { FIELD_TYPES } from "@/lib/types/form";
import BaseTextAreaField from "./BaseTextAreaField";
import BaseCheckboxField from "./BaseCheckboxField";

export const DEFAULT_FIELD_COMPONENTS_MAP: Record<
	FIELD_TYPES,
	React.FC<any>
> = {
	[FIELD_TYPES.TEXT]: BaseTextAreaField,
	[FIELD_TYPES.CHECKBOX]: BaseCheckboxField,
} as const;

export const DEFAULT_VALUES = {
	[FIELD_TYPES.TEXT]: "",
	[FIELD_TYPES.CHECKBOX]: [],
};
