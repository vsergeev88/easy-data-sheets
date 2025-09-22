import { type Instance, types } from "mobx-state-tree";

import { BareFieldSetModel } from "@/app/stores/bareStores/bareFieldSetModel";

import { ViewFieldModel as FieldModel } from "./fieldModel";

export const ViewFieldSetModel = BareFieldSetModel.named(
  "ViewFieldSetModel"
).props({
  fields: types.array(FieldModel),
});

export interface IViewFieldSetModel
  extends Instance<typeof ViewFieldSetModel> {}
