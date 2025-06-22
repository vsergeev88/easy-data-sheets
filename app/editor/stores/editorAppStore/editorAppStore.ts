import { applySnapshot, flow, type Instance, types } from "mobx-state-tree";
import React from "react";
import type { DataSheet } from "@/lib/data/dataSheets";
import type { Form } from "@/lib/types/form";
import { FALLBACK_FORM_DATA } from "../../constants/fallbackFormData";
import { FormDataModel, type IFormDataModel } from "./formDataModel";
import { FormInfoModel, type IFormInfoModel } from "./formInfoModel";

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
		get safeFormData(): IFormDataModel {
			if (!self.formData) {
				throw new Error("Form data is not initialized");
			}
			return self.formData;
		},
		get safeFormInfo(): IFormInfoModel {
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
				formData.fieldSets = [...FALLBACK_FORM_DATA.fieldSets];
			}
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
		saveAndPublish: flow(function* () {
			self.isSaving = true;
			yield new Promise((resolve) => setTimeout(resolve, 1000));
			self.isSaving = false;
			self.formInfo?.setUpdatedAt(new Date());
			self.shouldShowShareOptions = true;
		}),
	}));

export const editorAppStore = EditorAppModel.create({});

export interface IEditorAppStore extends Instance<typeof EditorAppModel> {}

export const EditorAppStoreContext =
	React.createContext<IEditorAppStore | null>(null);
