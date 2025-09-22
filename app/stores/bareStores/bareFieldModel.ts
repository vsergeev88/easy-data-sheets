import { type Instance, types } from "mobx-state-tree";
import { BareCheckboxFieldModel } from "./fields/bareCheckboxFieldModel";
import { BareTextFieldModel } from "./fields/bareTextFieldModel";

export const BareFieldModel = types.union(
	BareTextFieldModel,
	BareCheckboxFieldModel
);
export type IBareFieldModel = Instance<typeof BareFieldModel>;
