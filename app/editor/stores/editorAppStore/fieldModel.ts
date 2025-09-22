import { type Instance, types } from "mobx-state-tree";

import { CheckboxFieldModel } from "./fields/checkboxFieldModel";
import { TextFieldModel } from "./fields/textFieldModel";

export const FieldModel = types.union(TextFieldModel, CheckboxFieldModel);
export type IEditorFieldModel = Instance<typeof FieldModel>;
