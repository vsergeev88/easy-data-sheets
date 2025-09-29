import { type Instance, types } from "mobx-state-tree";

import { ChoiceFieldModel } from "./fields/choiceFieldModel";
import { TextFieldModel } from "./fields/textFieldModel";

export const FieldModel = types.union(TextFieldModel, ChoiceFieldModel);
export type IEditorFieldModel = Instance<typeof FieldModel>;
