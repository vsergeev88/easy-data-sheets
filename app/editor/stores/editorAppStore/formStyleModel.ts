import { Instance, types } from "mobx-state-tree";

export const FormStyleModel = types.model({
  primaryColor: types.maybeNull(types.string),
  secondaryColor: types.maybeNull(types.string),
})
export interface IFormStyleModel extends Instance<typeof FormStyleModel> {}