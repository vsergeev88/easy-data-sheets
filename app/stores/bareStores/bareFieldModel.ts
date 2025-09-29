import { type Instance, types } from "mobx-state-tree";

import { BareChoiceFieldModel } from "./fields/bareChoiceFieldModel";
import { BareTextFieldModel } from "./fields/bareTextFieldModel";

export const BareFieldModel = types.union(
  BareTextFieldModel,
  BareChoiceFieldModel
);
export type IBareFieldModel = Instance<typeof BareFieldModel>;
