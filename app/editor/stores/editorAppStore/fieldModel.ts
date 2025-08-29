import { type Instance, types } from "mobx-state-tree";
import { BaseFieldModel } from "../bareStores/bareFieldModel";
import { CheckboxFieldModel } from "./fields/checkboxFieldModel";
import { TextFieldModel } from "./fields/textFieldModel";

export const BaseEditorFieldModel = BaseFieldModel.named(
  "BaseEditorFieldModel"
).actions((self) => ({
  setLabel: (label: string): void => {
    self.label = label;
  },
  setDescription: (description: string): void => {
    self.description = description;
  },
  setRequired: (required: boolean): void => {
    self.required = required;
  },
}));
export interface IBaseEditorFieldModel
  extends Instance<typeof BaseEditorFieldModel> {}

export const FieldModel = types.union(TextFieldModel, CheckboxFieldModel);
export type IFieldModel = Instance<typeof FieldModel>;
