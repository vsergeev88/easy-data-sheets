import { type Instance, types } from "mobx-state-tree";

import { BareChoiceFieldModel } from "@/app/stores/bareStores/fields/bareChoiceFieldModel";

import { BaseViewFieldModel } from "../baseViewFieldModel";

export const ChoiceFieldModel = types
  .compose(BaseViewFieldModel, BareChoiceFieldModel)
  .named("ChoiceFieldModel");

export interface IChoiceFieldModel extends Instance<typeof ChoiceFieldModel> {}
