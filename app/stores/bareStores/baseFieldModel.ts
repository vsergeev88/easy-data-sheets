import { type Instance, types } from "mobx-state-tree";
import { FIELD_TYPES } from "@/lib/types/form";

export const BaseFieldModel = types.model({
	id: types.string,
	label: types.string,
	description: types.string,
	name: types.string,
	type: types.union(
		types.literal(FIELD_TYPES.TEXT),
		types.literal(FIELD_TYPES.CHECKBOX)
	),
	required: types.optional(types.boolean, false),
	disabled: types.optional(types.boolean, false),
	focusable: types.optional(types.boolean, true),
	draggable: types.optional(types.boolean, false),
	errorText: types.optional(types.string, ""),
});
export interface IBaseFieldModel extends Instance<typeof BaseFieldModel> {}
