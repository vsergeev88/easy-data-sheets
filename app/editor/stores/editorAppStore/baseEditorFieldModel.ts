import type { Instance } from "mobx-state-tree";
import { BaseFieldModel } from "@/app/stores/bareStores/baseFieldModel";

export const BaseEditorFieldModel = BaseFieldModel.named(
	"BaseEditorFieldModel"
).actions((self) => ({
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
export interface IBaseEditorFieldModel
	extends Instance<typeof BaseEditorFieldModel> {}
