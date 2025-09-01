import { type Instance, types } from "mobx-state-tree";
import { BareFormDataModel } from "@/app/stores/bareStores/bareFormDataModel";
import { ViewFieldSetModel as FieldSetModel } from "./fieldSetModel";
import { ViewFormStyleModel as FormStyleModel } from "./formStyleModel";

export const ViewFormDataModel = BareFormDataModel.named(
  "ViewFormDataModel"
).props({
  formStyle: types.maybeNull(FormStyleModel),
  fieldSets: types.array(FieldSetModel),
});

export interface IViewFormDataModel
  extends Instance<typeof ViewFormDataModel> {}
