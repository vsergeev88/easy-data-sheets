import { type Instance, types } from "mobx-state-tree";

export const BareFormStyleModel = types.model({
  primaryColor: types.maybeNull(types.string),
  secondaryColor: types.maybeNull(types.string),
});
export interface IBareFormStyleModel
  extends Instance<typeof BareFormStyleModel> {}
