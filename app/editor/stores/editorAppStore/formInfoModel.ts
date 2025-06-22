import { type Instance, types } from "mobx-state-tree";

export const FormInfoModel = types.model({
	id: types.identifier,
	name: types.string,
	createdAt: types.Date,
	updatedAt: types.Date,
	userId: types.string,
	published: types.boolean,
	companyId: types.maybeNull(types.string),
});
export interface IFormInfoModel extends Instance<typeof FormInfoModel> {}
