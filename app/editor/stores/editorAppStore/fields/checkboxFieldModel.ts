import { cast, type Instance, types } from "mobx-state-tree";

import { BareCheckboxFieldModel } from "@/app/stores/bareStores/fields/bareCheckboxFieldModel";

import { BaseEditorFieldModel } from "../baseEditorFieldModel";

export const CheckboxFieldModel = types
  .compose(BaseEditorFieldModel, BareCheckboxFieldModel)
  .named("CheckboxFieldModel")
  .actions((self) => ({
    removeItem: (index: number): void => {
      const nextItems = [...self.items];
      nextItems.splice(index, 1);
      self.items = cast(nextItems);
    },
  }))
  .actions((self) => ({
    setWithCustomField: (value: boolean): void => {
      self.withCustomField = value;
    },
    editItem: (item: string, index: number): void => {
      let nextItem = item;
      if (item === "") {
        self.removeItem(index);
        return;
      }
      if (
        self.items.includes(nextItem) &&
        index !== self.items.indexOf(nextItem)
      ) {
        nextItem += ` (${index + 1})`;
      }
      const nextItems = [...self.items];
      nextItems[index] = nextItem;
      self.items = cast(nextItems);
    },
  }));

export interface ICheckboxFieldModel
  extends Instance<typeof CheckboxFieldModel> {}
