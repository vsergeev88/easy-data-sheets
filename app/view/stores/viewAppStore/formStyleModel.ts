import type { Instance } from "mobx-state-tree";
import { BareFormStyleModel } from "../../../stores/bareStores/bareFormStyleModel";

export const ViewFormStyleModel =
	BareFormStyleModel.named("ViewFormStyleModel");
export interface IViewFormStyleModel
	extends Instance<typeof ViewFormStyleModel> {}
