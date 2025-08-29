import { type Instance, types } from "mobx-state-tree";
import { BareTextFieldModel } from "../../bareStores/fields/bareTextFieldModel";
import { BaseEditorFieldModel } from "../fieldModel";

export const TextFieldModel = types
  .compose(BaseEditorFieldModel, BareTextFieldModel)
  .named("TextFieldModel");

export interface ITextFieldModel extends Instance<typeof TextFieldModel> {}
