import { cast, type Instance, types } from "mobx-state-tree";
import { BareFieldSetModel } from "../../../stores/bareStores/bareFieldSetModel";
import { FieldModel, type IFieldModel } from "./fieldModel";

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
    setFields: (fields: IFieldModel[]): void => {
      self.fields = cast(fields);
    },
  }))
  .actions((self) => ({
    addField: (field: IFieldModel): void => {
      self.fields.push(FieldModel.create(field));
    },
    setLegend: (legend: string): void => {
      self.legend = legend;
    },
    removeField: (fieldId: string): void => {
      self.fields = cast(self.fields.filter((field) => field.id !== fieldId));
    },
  }));

export interface IEditorFieldSetModel
  extends Instance<typeof EditorFieldSetModel> {}
