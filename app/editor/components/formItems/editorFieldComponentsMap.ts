import { DEFAULT_FIELD_COMPONENTS_MAP } from "@/components/baseFormItems/constants";
import { FIELD_TYPES } from "@/lib/types/form";

import ChoiceField, { type EditorChoiceFieldProps } from "./ChoiceField";
import TextAreaField, { type EditorTextAreaFieldProps } from "./TextAreaField";

export const EDITOR_FIELD_COMPONENTS_MAP = {
  ...DEFAULT_FIELD_COMPONENTS_MAP,
  [FIELD_TYPES.TEXT]: TextAreaField as React.FC<EditorTextAreaFieldProps>,
  [FIELD_TYPES.CHOICE]: ChoiceField as React.FC<EditorChoiceFieldProps>,
} as const;
