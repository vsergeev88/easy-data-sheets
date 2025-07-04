import { cast, type Instance, types } from "mobx-state-tree";
import { FIELD_TYPES } from "@/lib/types/form";

export const BaseFieldModel = types
	.model({
		id: types.string,
		label: types.string,
		description: types.string,
		name: types.string,
		type: types.union(
			types.literal(FIELD_TYPES.TEXT),
			types.literal(FIELD_TYPES.CHECKBOX),
		),
		required: types.optional(types.boolean, false),
		disabled: types.optional(types.boolean, false),
		focusable: types.optional(types.boolean, true),
		draggable: types.optional(types.boolean, false),
		errorText: types.optional(types.string, ""),
	})
	.actions((self) => ({
		setLabel: (label: string): void => {
			self.label = label;
		},
		setDescription: (description: string): void => {
			self.description = description;
		},
		setRequired: (required: boolean): void => {
			self.required = required;
		},
	}));
export interface IBaseFieldModel extends Instance<typeof BaseFieldModel> {}

export const TextFieldModel = BaseFieldModel.named("TextFieldModel").props({
	type: types.literal(FIELD_TYPES.TEXT),
	placeholder: types.optional(types.string, ""),
	disabled: types.optional(types.boolean, false),
	value: types.optional(types.string, ""),
}).actions((self) => ({
	setValue: (value: string): void => {
		self.value = value;
	},
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		self.value = e.target.value;
	},
}));
export interface ITextFieldModel extends Instance<typeof TextFieldModel> {}

export const CheckboxFieldModel = BaseFieldModel.named(
	"CheckboxFieldModel",
).props({
	type: types.literal(FIELD_TYPES.CHECKBOX),
	items: types.array(types.string),
	withCustomField: types.optional(types.boolean, false),
	value: types.optional(types.array(types.string), []),
}).actions((self) => ({
	setValue: (value: string[]): void => {
		self.value = cast(value);
	},
}));
export interface ICheckboxFieldModel
	extends Instance<typeof CheckboxFieldModel> {}

export const FieldModel = types.union(TextFieldModel, CheckboxFieldModel);
export type IFieldModel = Instance<typeof FieldModel>;
