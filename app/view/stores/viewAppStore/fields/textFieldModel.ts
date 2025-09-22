import { type Instance, types } from "mobx-state-tree";

import { BareTextFieldModel } from "@/app/stores/bareStores/fields/bareTextFieldModel";

import { BaseViewFieldModel } from "../baseViewFieldModel";

export const TextFieldModel = types
  .compose(BaseViewFieldModel, BareTextFieldModel)
  .named("TextFieldModel")
  .actions((self) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
      self.value = e.target.value;
    },
  }));

export interface ITextFieldModel extends Instance<typeof TextFieldModel> {}
