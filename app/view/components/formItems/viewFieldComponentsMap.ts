import { DEFAULT_FIELD_COMPONENTS_MAP } from "@/components/baseFormItems/constants";
import { FIELD_TYPES } from "@/lib/types/form";

import ChoiceField, { type ViewChoiceFieldProps } from "./ChoiceField";
import TextAreaField, { type ViewTextAreaFieldProps } from "./TextAreaField";

export const VIEW_FIELD_COMPONENTS_MAP = {
  ...DEFAULT_FIELD_COMPONENTS_MAP,
  [FIELD_TYPES.TEXT]: TextAreaField as React.FC<ViewTextAreaFieldProps>,
  [FIELD_TYPES.CHOICE]: ChoiceField as React.FC<ViewChoiceFieldProps>,
} as const;
