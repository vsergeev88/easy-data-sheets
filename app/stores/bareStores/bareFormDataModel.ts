import { type Instance, types } from "mobx-state-tree";
import { BareFieldSetModel } from "./bareFieldSetModel";
import { BareFormStyleModel } from "./bareFormStyleModel";
import { BareSubmitButtonModel } from "./fields/bareSubmitButtonModel";

interface IVolatile {
  selectedFieldSetId: string | null;
  selectedFieldId: string | null;
}

export const BareFormDataModel = types
  .model({
    formStyle: types.maybeNull(BareFormStyleModel),
    fieldSets: types.array(BareFieldSetModel),
    description: types.maybeNull(types.string),
    submitButton: types.optional(BareSubmitButtonModel, () =>
      BareSubmitButtonModel.create({
        type: "submit-button",
        label: "Submit",
      })
    ),
  })
  .volatile<IVolatile>(() => ({
    selectedFieldSetId: null,
    selectedFieldId: null,
  }))
  .views((self) => ({
    get isSingleFieldSet(): boolean {
      return self.fieldSets.length === 1;
    },
  }))
  .actions((self) => ({
    setSelectedFieldSetId: (id: string | null): void => {
      self.selectedFieldSetId = id;
    },
    setSelectedFieldId: (id: string | null): void => {
      self.selectedFieldId = id;
    },
  }));
export interface IBareFormDataModel
  extends Instance<typeof BareFormDataModel> {}
