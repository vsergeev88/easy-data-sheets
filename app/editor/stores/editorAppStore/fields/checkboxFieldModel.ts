import { type Instance, types } from "mobx-state-tree";
import { BareCheckboxFieldModel } from "../../bareStores/fields/bareCheckboxFieldModel";
import { BaseEditorFieldModel } from "../fieldModel";

export const CheckboxFieldModel = types
  .compose(BaseEditorFieldModel, BareCheckboxFieldModel)
  .named("CheckboxFieldModel");

export interface ICheckboxFieldModel
  extends Instance<typeof CheckboxFieldModel> {}
