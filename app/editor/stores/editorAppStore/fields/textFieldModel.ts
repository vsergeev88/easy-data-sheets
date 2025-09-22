import { type Instance, types } from "mobx-state-tree";
import { BareTextFieldModel } from "@/app/stores/bareStores/fields/bareTextFieldModel";
import { BaseEditorFieldModel } from "../baseEditorFieldModel";

export const TextFieldModel = types
	.compose(BaseEditorFieldModel, BareTextFieldModel)
	.named("TextFieldModel");

export interface ITextFieldModel extends Instance<typeof TextFieldModel> {}
