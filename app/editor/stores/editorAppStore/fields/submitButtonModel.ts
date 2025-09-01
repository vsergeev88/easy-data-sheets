import type { Instance } from "mobx-state-tree";
import { BareSubmitButtonModel } from "@/app/stores/bareStores/fields/bareSubmitButtonModel";

export const SubmitButtonModel = BareSubmitButtonModel.named(
  "SubmitButtonModel"
).actions((self) => ({
  setLabel: (label: string): void => {
    self.label = label;
  },
}));
export interface ISubmitButtonModel
  extends Instance<typeof SubmitButtonModel> {}
