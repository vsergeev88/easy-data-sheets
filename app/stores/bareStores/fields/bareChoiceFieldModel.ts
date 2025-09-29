import { cast, type Instance, types } from "mobx-state-tree";

import { CHOICE_TYPES, FIELD_TYPES } from "@/lib/types/form";

import { BaseFieldModel } from "../baseFieldModel";

export const BareChoiceFieldModel = BaseFieldModel.named("BareChoiceFieldModel")
  .props({
    type: types.literal(FIELD_TYPES.CHOICE),
    choiceType: types.enumeration(Object.values(CHOICE_TYPES)),
    items: types.array(types.string),
    withCustomField: types.optional(types.boolean, false),
    value: types.optional(types.array(types.string), []),
  })
  .actions((self) => ({
    setValue: (value: string[]): void => {
      self.value = cast(value);
    },
    addItem: (item: string): void => {
      self.items.push(item);
    },
  }));
export interface IBareChoiceFieldModel
  extends Instance<typeof BareChoiceFieldModel> {}
