
import { type Instance, types } from "mobx-state-tree";

export const SubmitButtonModel = types.model({
	type: types.literal("submit-button"),
	label: types.optional(types.string, "Submit"),
}).actions((self) => ({
	setLabel: (label: string): void => {
		self.label = label;
	},
}));
export interface ISubmitButtonModel extends Instance<typeof SubmitButtonModel> {}
