import { cast, getSnapshot, type Instance, types } from "mobx-state-tree";

import { EMPTY_FIELD_SET } from "@/app/editor/constants/fallbackFormData";
import { BareFormDataModel } from "@/app/stores/bareStores/bareFormDataModel";
import { FIELD_TYPES, type FieldSet } from "@/lib/types/form";

import { FieldModel, type IEditorFieldModel } from "./fieldModel";
import {
  EditorFieldSetModel,
  type IEditorFieldSetModel,
} from "./fieldSetModel";
import { SubmitButtonModel } from "./fields/submitButtonModel";
import { FormStyleModel } from "./formStyleModel";

export const EditorFormDataModel = BareFormDataModel.named(
  "EditorFormDataModel"
)
  .props({
    formStyle: types.maybeNull(FormStyleModel),
    fieldSets: types.array(EditorFieldSetModel),
    description: types.maybeNull(types.string),
    submitButton: types.optional(SubmitButtonModel, () =>
      SubmitButtonModel.create({
        type: "submit-button",
        label: "Submit",
      })
    ),
  })
  .views((self) => ({
    getFirstFieldsetInViewport(): IEditorFieldSetModel | undefined {
      return self.fieldSets.find((fieldSet) => fieldSet.isInViewPort) as
        | IEditorFieldSetModel
        | undefined;
    },
    getFieldSetById: (fieldSetId: string): IEditorFieldSetModel => {
      const fieldSet = self.fieldSets.find((set) => set.id === fieldSetId);
      if (!fieldSet) {
        throw new Error(`Field set with id ${fieldSetId} not found`);
      }
      return fieldSet as IEditorFieldSetModel;
    },
    getFieldSetIdByFieldId: (fieldId: string): string => {
      const fieldSetId = self.fieldSets.find((fieldSet) =>
        fieldSet.fields.some((field) => field.id === fieldId)
      )?.id;
      if (!fieldSetId) {
        throw new Error(`Field with id ${fieldId} not found`);
      }
      return fieldSetId;
    },
    getFieldById: (fieldId: string): IEditorFieldModel => {
      const fieldSet = self.fieldSets.find((set) =>
        set.fields.some((field) => field.id === fieldId)
      );
      if (!fieldSet) {
        throw new Error(`Field with id ${fieldId} not found`);
      }
      return fieldSet.fields.find(
        (field) => field.id === fieldId
      ) as IEditorFieldModel;
    },
  }))
  .actions((self) => ({
    setDescription: (description: string) => {
      self.description = description;
    },
    addFieldSet: (fieldSet: FieldSet, afterId: string | null): void => {
      const newFieldSet = EditorFieldSetModel.create(fieldSet);
      const updatedFieldSets = [...self.fieldSets] as IEditorFieldSetModel[];
      if (afterId) {
        const afterIndex = self.fieldSets.findIndex(
          (set) => set.id === afterId
        );
        if (afterIndex !== -1) {
          updatedFieldSets.splice(afterIndex + 1, 0, newFieldSet);
        }
      } else {
        updatedFieldSets.push(newFieldSet);
      }
      self.fieldSets = cast(updatedFieldSets);
      self.setSelectedFieldSetId(newFieldSet.id);
    },
    removeFieldSet: (fieldSetId: string): void => {
      const updatedFieldSets = [...self.fieldSets] as IEditorFieldSetModel[];
      const fieldSetIndex = updatedFieldSets.findIndex(
        (fieldSet) => fieldSet.id === fieldSetId
      );
      if (fieldSetIndex !== -1) {
        updatedFieldSets.splice(fieldSetIndex, 1);
      }
      self.fieldSets = cast(updatedFieldSets);
      self.setSelectedFieldSetId(null);
      self.setSelectedFieldId(null);
    },
  }))
  .actions((self) => ({
    addField: (fieldSetId: string | null, field: IEditorFieldModel): void => {
      const fieldSet = fieldSetId
        ? self.getFieldSetById(fieldSetId)
        : (self.getFirstFieldsetInViewport() ??
          (self.fieldSets.at(-1) as IEditorFieldSetModel));
      if (!fieldSet) {
        throw new Error("Field set not found");
      }
      (fieldSet as IEditorFieldSetModel).addField(field);
      self.setSelectedFieldId(field.id);
      self.setSelectedFieldSetId(fieldSet.id);
    },
    removeField: (fieldId: string): void => {
      self.setSelectedFieldId(null);
      const targetFieldSetId = self.getFieldSetIdByFieldId(fieldId);
      const fieldSet = self.getFieldSetById(targetFieldSetId);
      fieldSet.removeField(fieldId);
    },
  }))
  .actions((self) => ({
    addEmptyFieldSet: (afterId: string | null): void => {
      self.addFieldSet(
        { ...EMPTY_FIELD_SET, id: crypto.randomUUID() },
        afterId
      );
    },
    duplicateField: (fieldId: string): void => {
      const fieldSetId = self.getFieldSetIdByFieldId(fieldId);
      const field = self.getFieldById(fieldId);
      const fieldSnapshot = getSnapshot(field);
      self.addField(
        fieldSetId,
        FieldModel.create({ ...fieldSnapshot, id: crypto.randomUUID() })
      );
    },
    moveField: ({
      fieldId,
      toFieldSetId,
    }: {
      fieldId: string;
      toFieldSetId: string;
    }): void => {
      const fieldSet = self.getFieldSetById(toFieldSetId);
      const field = self.getFieldById(fieldId);
      const fieldSnapshot = getSnapshot(field);
      fieldSet.addField(
        FieldModel.create({ ...fieldSnapshot, id: crypto.randomUUID() })
      );
      self.removeField(fieldId);
    },
    addTextInput: (fieldSetId: string | null): void => {
      const fieldId = crypto.randomUUID();
      self.addField(
        fieldSetId,
        FieldModel.create({
          id: fieldId,
          type: FIELD_TYPES.TEXT,
          name: fieldId,
          label: "Text input",
          description: "Enter your text",
          required: false,
        })
      );
      self.setSelectedFieldId(fieldId);
    },
  }));
export interface IEditorFormDataModel
  extends Instance<typeof EditorFormDataModel> {}
