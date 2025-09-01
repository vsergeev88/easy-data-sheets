import { type Instance, types } from "mobx-state-tree";

export const BareSubmitButtonModel = types.model({
  type: types.literal("submit-button"),
  label: types.optional(types.string, "Submit"),
});
export interface IBareSubmitButtonModel
  extends Instance<typeof BareSubmitButtonModel> {}
