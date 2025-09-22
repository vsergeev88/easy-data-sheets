import { DEFAULT_FIELD_COMPONENTS_MAP } from "@/components/baseFormItems/constants";
import { FIELD_TYPES } from "@/lib/types/form";

import CheckboxField, { type ViewCheckboxFieldProps } from "./CheckboxField";
import TextAreaField, { type ViewTextAreaFieldProps } from "./TextAreaField";

export const VIEW_FIELD_COMPONENTS_MAP = {
  ...DEFAULT_FIELD_COMPONENTS_MAP,
  [FIELD_TYPES.TEXT]: TextAreaField as React.FC<ViewTextAreaFieldProps>,
  [FIELD_TYPES.CHECKBOX]: CheckboxField as React.FC<ViewCheckboxFieldProps>,
} as const;
