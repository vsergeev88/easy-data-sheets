import { cast, type Instance, types } from "mobx-state-tree";

import { BareChoiceFieldModel } from "@/app/stores/bareStores/fields/bareChoiceFieldModel";

import { BaseEditorFieldModel } from "../baseEditorFieldModel";

export const ChoiceFieldModel = types
  .compose(BaseEditorFieldModel, BareChoiceFieldModel)
  .named("ChoiceFieldModel")
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
    setItems: (items: string[]): void => {
      self.items = cast(items);
    },
  }));

export interface IChoiceFieldModel extends Instance<typeof ChoiceFieldModel> {}
