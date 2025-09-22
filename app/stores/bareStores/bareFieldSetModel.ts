import { type Instance, types } from "mobx-state-tree";
import { BareFieldModel } from "./bareFieldModel";

export const BareFieldSetModel = types
	.model({
		id: types.identifier,
		legend: types.maybeNull(types.string),
		fields: types.array(BareFieldModel),
	})
	.volatile(() => ({
		isInViewPort: false,
	}))
	.actions((self) => ({
		setIsInViewPort: (isInViewPort: boolean): void => {
			self.isInViewPort = isInViewPort;
		},
	}));

export interface IBareFieldSetModel
	extends Instance<typeof BareFieldSetModel> {}
