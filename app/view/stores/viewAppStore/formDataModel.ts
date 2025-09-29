import { type Instance, types } from "mobx-state-tree";

import { BareFormDataModel } from "@/app/stores/bareStores/bareFormDataModel";

import { type IViewFieldSetModel, ViewFieldSetModel } from "./fieldSetModel";
import { ViewFormStyleModel as FormStyleModel } from "./formStyleModel";

export type DatasheetSubmitData = {
  legend: string;
  fields: {
    name: string;
    value: string | string[];
  }[];
};

export const ViewFormDataModel = BareFormDataModel.named("ViewFormDataModel")
  .props({
    formStyle: types.maybeNull(FormStyleModel),
    fieldSets: types.array(ViewFieldSetModel),
  })
  .views((self) => ({
    get contacts(): string | null {
      return null;
    },
    get submitData(): DatasheetSubmitData[] {
      return self.fieldSets.map(
        (fieldSet: IViewFieldSetModel, index: number) => {
          return {
            legend: `${index + 1} ${fieldSet.legend ?? ""}`,
            fields: fieldSet.fields.map((field) => {
              return {
                name: field.name,
                value: field.value,
              };
            }),
          };
        }
      );
    },
  }));

export interface IViewFormDataModel
  extends Instance<typeof ViewFormDataModel> {}
