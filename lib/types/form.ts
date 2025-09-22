export enum FIELD_TYPES {
  TEXT = "text",
  CHECKBOX = "checkbox",
}

export type CommonFieldProps = {
  id: string;
  label: string;
  description: string;
  name: string;
  type: FIELD_TYPES;
  required?: boolean;
};

export type TextField = CommonFieldProps & {
  type: FIELD_TYPES.TEXT;
};

export type CheckboxField = CommonFieldProps & {
  type: FIELD_TYPES.CHECKBOX;
  items: string[];
  withCustomField?: boolean;
};

export type Field = TextField | CheckboxField;

export type FieldSet = {
  id: string;
  legend?: string;
  fields: Field[];
};

export type FormStyle = {
  primaryColor?: string;
  secondaryColor?: string;
};

export type Form = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  userId: boolean;
  authorId: string;
  companyId?: string;
  formStyle?: FormStyle;
  fieldSets: FieldSet[];
};
