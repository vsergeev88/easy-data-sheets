import { type Instance, types } from "mobx-state-tree";

import { CheckboxFieldModel } from "./fields/checkboxFieldModel";
import { TextFieldModel } from "./fields/textFieldModel";

export const ViewFieldModel = types.union(TextFieldModel, CheckboxFieldModel);
export type IViewFieldModel = Instance<typeof ViewFieldModel>;
