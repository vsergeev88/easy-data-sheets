import { cast, type Instance, types } from "mobx-state-tree";
import { FIELD_TYPES } from "@/lib/types/form";
import { BaseFieldModel } from "../baseFieldModel";

export const BareCheckboxFieldModel = BaseFieldModel.named("CheckboxFieldModel")
  .props({
    type: types.literal(FIELD_TYPES.CHECKBOX),
    items: types.array(types.string),
    withCustomField: types.optional(types.boolean, false),
    value: types.optional(types.array(types.string), []),
  })
  .actions((self) => ({
    setValue: (value: string[]): void => {
      self.value = cast(value);
    },
  }));
export interface IBareCheckboxFieldModel
  extends Instance<typeof BareCheckboxFieldModel> {}
