import type { Instance } from "mobx-state-tree";
import { BareFormInfoModel } from "../../../stores/bareStores/bareFormInfoModel";

export const ViewFormInfoModel = BareFormInfoModel.named("ViewFormInfoModel");
export interface IViewFormInfoModel
  extends Instance<typeof ViewFormInfoModel> {}
