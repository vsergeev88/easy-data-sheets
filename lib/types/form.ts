export const FIELD_TYPES = {
  TEXT: "text",
  CHOICE: "choice",
};

export type FieldTypes = (typeof FIELD_TYPES)[keyof typeof FIELD_TYPES];

export const CHOICE_TYPES = {
  RADIO: "radio",
  CHECKBOX: "checkbox",
};

export type ChoiceTypes = (typeof CHOICE_TYPES)[keyof typeof CHOICE_TYPES];

export type CommonFieldProps = {
  id: string;
  label: string;
  description: string;
  name: string;
  type: FieldTypes;
  required?: boolean;
};

export type TextField = CommonFieldProps & {
  type: "text";
};

export type ChoiceField = CommonFieldProps & {
  type: "choice";
  items: string[];
  withCustomField?: boolean;
};

export type Field = TextField | ChoiceField;

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
