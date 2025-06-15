import { DEFAULT_FIELD_COMPONENTS_MAP } from '@/components/baseFormItems/constants'
import { FIELD_TYPES } from '@/lib/types/form'
import TextAreaField from './TextAreaField'
import CheckboxField from './CheckboxField'

export const EDITOR_FIELD_COMPONENTS_MAP = {
  ...DEFAULT_FIELD_COMPONENTS_MAP,
  [FIELD_TYPES.TEXT]: TextAreaField,
  [FIELD_TYPES.CHECKBOX]: CheckboxField,
} as const
