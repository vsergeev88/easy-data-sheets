import type { DataSheet } from "@/lib/data/dataSheets";
import type { Form } from "@/lib/types/form";

import { flow, type Instance, types } from "mobx-state-tree";
import React from "react";

import { type IViewFormDataModel, ViewFormDataModel } from "./formDataModel";
import { type IViewFormInfoModel, ViewFormInfoModel } from "./formInfoModel";

const ViewAppModel = types
  .model({
    formData: types.optional(types.maybeNull(ViewFormDataModel), null),
    formInfo: types.optional(types.maybeNull(ViewFormInfoModel), null),
  })
  .volatile(() => ({
    isSubmitting: false,
    isInitialized: false,
  }))
  .views((self) => ({
    get safeFormData(): IViewFormDataModel {
      if (!self.formData) {
        throw new Error("Form data is not initialized");
      }
      return self.formData;
    },
    get safeFormInfo(): IViewFormInfoModel {
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
      if (!formData.fieldSets?.length) {
        throw new Error("fieldSets are empty");
      }
      self.formData = ViewFormDataModel.create(formData);
      formInfo.createdAt = new Date(formInfo.createdAt);
      formInfo.updatedAt = new Date(formInfo.updatedAt);
      self.formInfo = ViewFormInfoModel.create(formInfo);
      self.isInitialized = true;
    },
    submitDatasheet: flow(function* () {
      self.isSubmitting = true;
      try {
        yield new Promise((resolve) => {
          console.log("submitDatasheet");
          resolve(true);
        });
      } catch {
        // TODO: add error handling
      } finally {
        self.isSubmitting = false;
      }
    }),
  }));

export const viewAppStore = ViewAppModel.create({});

export interface IViewAppStore extends Instance<typeof ViewAppModel> {}

export const ViewAppStoreContext = React.createContext<IViewAppStore | null>(
  null
);
