import type { Instance } from "mobx-state-tree";

import { BaseFieldModel } from "../../../stores/bareStores/baseFieldModel";

export const BaseViewFieldModel = BaseFieldModel.named("BaseViewFieldModel");
export interface IBaseViewFieldModel
  extends Instance<typeof BaseViewFieldModel> {}
