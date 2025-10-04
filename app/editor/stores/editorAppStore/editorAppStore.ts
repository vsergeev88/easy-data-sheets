import type { DataSheet } from "@/lib/data/dataSheets";
import type { Form } from "@/lib/types/form";

import { applySnapshot, flow, type Instance, types } from "mobx-state-tree";
import React from "react";

import { updateDataSheetClient } from "@/lib/utils/client-api";

import {
  EditorFormDataModel as FormDataModel,
  type IEditorFormDataModel,
} from "./formDataModel";
import {
  EditorFormInfoModel as FormInfoModel,
  type IEditorFormInfoModel,
} from "./formInfoModel";

const EditorAppModel = types
  .model({
    formData: types.optional(types.maybeNull(FormDataModel), null),
    formInfo: types.optional(types.maybeNull(FormInfoModel), null),
  })
  .volatile(() => ({
    isSaving: false,
    isInitialized: false,
    shouldShowShareOptions: false,
  }))
  .actions((self) => ({
    setShouldShowShareOptions: (shouldShowShareOptions: boolean) => {
      self.shouldShowShareOptions = shouldShowShareOptions;
    },
  }))
  .views((self) => ({
    get safeFormData(): IEditorFormDataModel {
      if (!self.formData) {
        throw new Error("Form data is not initialized");
      }
      return self.formData;
    },
    get safeFormInfo(): IEditorFormInfoModel {
      if (!self.formInfo) {
        throw new Error("Form info is not initialized");
      }
      return self.formInfo;
    },
  }))
  .actions((self) => ({
    init: (dataSheet: DataSheet) => {
      const { data, ...formInfo } = dataSheet;
      const formData = JSON.parse(data) as Form;
      self.formData = FormDataModel.create(formData);
      formInfo.createdAt = new Date(formInfo.createdAt);
      formInfo.updatedAt = new Date(formInfo.updatedAt);
      self.formInfo = FormInfoModel.create(formInfo);
      self.isInitialized = true;
    },
    setFormData: (formData: Form) => {
      self.formData = FormDataModel.create(formData);
    },
    replaceFormData: (formData: Form) => {
      if (self.formData) {
        applySnapshot(self.formData, formData);
      } else {
        self.formData = FormDataModel.create(formData);
      }
    },
    save: flow(function* () {
      self.isSaving = true;
      try {
        const dataSheet = {
          ...self.formInfo,
          data: JSON.stringify(self.formData),
        } as DataSheet;

        const result = yield updateDataSheetClient(dataSheet);

        if (result.success && result.data) {
          self.formInfo?.setUpdatedAt(new Date(result.data.updatedAt));
          self.shouldShowShareOptions = true;
        } else {
          // Можно добавить уведомление об ошибке
        }
      } catch {
        // Можно добавить уведомление об ошибке
      } finally {
        self.isSaving = false;
      }
    }),
    setIsInitialized: (isInitialized: boolean) => {
      self.isInitialized = isInitialized;
    },
  }));

export const editorAppStore = EditorAppModel.create({});

export interface IEditorAppStore extends Instance<typeof EditorAppModel> {}

export const EditorAppStoreContext =
  React.createContext<IEditorAppStore | null>(null);
