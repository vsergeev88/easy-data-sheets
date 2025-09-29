import { type Instance, types } from "mobx-state-tree";

import { ChoiceFieldModel } from "./fields/checkboxFieldModel";
import { TextFieldModel } from "./fields/textFieldModel";

export const ViewFieldModel = types.union(TextFieldModel, ChoiceFieldModel);
export type IViewFieldModel = Instance<typeof ViewFieldModel>;
