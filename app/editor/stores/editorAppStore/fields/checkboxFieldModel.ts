import { type Instance, types } from "mobx-state-tree";
import { BareCheckboxFieldModel } from "@/app/stores/bareStores/fields/bareCheckboxFieldModel";
import { BaseEditorFieldModel } from "../baseEditorFieldModel";

export const CheckboxFieldModel = types
	.compose(BaseEditorFieldModel, BareCheckboxFieldModel)
	.named("CheckboxFieldModel");

export interface ICheckboxFieldModel
	extends Instance<typeof CheckboxFieldModel> {}
