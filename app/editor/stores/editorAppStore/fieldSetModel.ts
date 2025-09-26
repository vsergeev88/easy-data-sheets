import { cast, detach, type Instance, types } from "mobx-state-tree";

import { BareFieldSetModel } from "@/app/stores/bareStores/bareFieldSetModel";

import { FieldModel, type IEditorFieldModel } from "./fieldModel";

export const EditorFieldSetModel = BareFieldSetModel.named(
  "EditorFieldSetModel"
)
  .props({
    fields: types.array(FieldModel),
  })
  .actions((self) => ({
    setLegend: (legend: string): void => {
      self.legend = legend;
    },
    setFields: (fields: IEditorFieldModel[]): void => {
      self.fields = cast(fields);
    },
  }))
  .actions((self) => ({
    addField: (field: IEditorFieldModel): void => {
      self.fields.push(FieldModel.create(field));
    },
    setLegend: (legend: string): void => {
      self.legend = legend;
    },
    removeField: (fieldId: string): void => {
      detach(self.fields.find((field) => field.id === fieldId));
      self.fields = cast(self.fields.filter((field) => field.id !== fieldId));
    },
  }));

export interface IEditorFieldSetModel
  extends Instance<typeof EditorFieldSetModel> {}
