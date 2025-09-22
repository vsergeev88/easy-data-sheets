import { type Instance, types } from "mobx-state-tree";

import { BareCheckboxFieldModel } from "@/app/stores/bareStores/fields/bareCheckboxFieldModel";

import { BaseViewFieldModel } from "../baseViewFieldModel";

export const CheckboxFieldModel = types
  .compose(BaseViewFieldModel, BareCheckboxFieldModel)
  .named("CheckboxFieldModel");

export interface ICheckboxFieldModel
  extends Instance<typeof CheckboxFieldModel> {}
