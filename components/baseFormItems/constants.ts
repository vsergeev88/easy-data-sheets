import { FIELD_TYPES, type FieldTypes } from "@/lib/types/form";

import BaseChoiceField from "./BaseChoiceField";
import BaseTextAreaField from "./BaseTextAreaField";

export const DEFAULT_FIELD_COMPONENTS_MAP: Record<FieldTypes, React.FC<any>> = {
  [FIELD_TYPES.TEXT]: BaseTextAreaField,
  [FIELD_TYPES.CHOICE]: BaseChoiceField,
} as const;

export const DEFAULT_VALUES = {
  [FIELD_TYPES.TEXT]: "",
  [FIELD_TYPES.CHOICE]: [],
};
