import { type Instance, types } from "mobx-state-tree";

import { BareTextFieldModel } from "@/app/stores/bareStores/fields/bareTextFieldModel";

import { BaseViewFieldModel } from "../baseViewFieldModel";

export const TextFieldModel = types
  .compose(BaseViewFieldModel, BareTextFieldModel)
  .named("TextFieldModel");

export interface ITextFieldModel extends Instance<typeof TextFieldModel> {}
