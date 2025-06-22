import type { ICheckboxFieldModel, ITextFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import { DEFAULT_FIELD_COMPONENTS_MAP } from "@/components/baseFormItems/constants";
import { FIELD_TYPES } from "@/lib/types/form";
import CheckboxField from "./CheckboxField";
import TextAreaField from "./TextAreaField";

export const EDITOR_FIELD_COMPONENTS_MAP = {
	...DEFAULT_FIELD_COMPONENTS_MAP,
	[FIELD_TYPES.TEXT]: TextAreaField as React.FC<{ field: ITextFieldModel }>,
	[FIELD_TYPES.CHECKBOX]: CheckboxField as React.FC<{ field: ICheckboxFieldModel }>,
} as const;
