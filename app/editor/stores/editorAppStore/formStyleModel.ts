import type { Instance } from "mobx-state-tree";
import { BareFormStyleModel } from "../bareStores/bareFormStyleModel";

export const FormStyleModel = BareFormStyleModel.named("FormStyleModel");
export interface IFormStyleModel extends Instance<typeof FormStyleModel> {}
