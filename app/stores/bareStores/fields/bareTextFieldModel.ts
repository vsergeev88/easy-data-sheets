import { type Instance, types } from "mobx-state-tree";

import { FIELD_TYPES } from "@/lib/types/form";

import { BaseFieldModel } from "../baseFieldModel";

export const BareTextFieldModel = BaseFieldModel.named("TextFieldModel")
  .props({
    type: types.literal(FIELD_TYPES.TEXT),
    placeholder: types.optional(types.string, ""),
    disabled: types.optional(types.boolean, false),
    value: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setValue: (value: string): void => {
      self.value = value;
    },
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      self.value = e.target.value;
    },
  }));
export interface IBareTextFieldModel
  extends Instance<typeof BareTextFieldModel> {}
