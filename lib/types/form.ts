export enum FIELD_TYPES {
  TEXT = "text",
  CHECKBOX = "checkbox",
}

export type CommonFieldProps = {
  label: string
  description?: string
  name: string
  type: FIELD_TYPES
  required?: boolean
}

export type TextField = CommonFieldProps & {
  type: FIELD_TYPES.TEXT
}

export type CheckboxField = CommonFieldProps & {
  type: FIELD_TYPES.CHECKBOX
  items: {
    id: string
    label: string
  }[]
}

export type Field = TextField | CheckboxField

export type FieldSet = {
  legend?: string
  fields: Field[]
}

export type FormStyle = {
  primaryColor?: string
  secondaryColor?: string
}

export type Form = {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  isPublic: boolean
  authorId: string
  companyId?: string
  formStyle?: FormStyle
  fieldSets: FieldSet[]
}
