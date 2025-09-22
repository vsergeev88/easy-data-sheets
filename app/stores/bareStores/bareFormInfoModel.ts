import { type Instance, types } from "mobx-state-tree";

export const BareFormInfoModel = types.model({
	id: types.identifier,
	name: types.string,
	createdAt: types.Date,
	updatedAt: types.Date,
	userId: types.string,
	published: types.boolean,
	companyId: types.maybeNull(types.string),
});

export interface IBareFormInfoModel
	extends Instance<typeof BareFormInfoModel> {}
