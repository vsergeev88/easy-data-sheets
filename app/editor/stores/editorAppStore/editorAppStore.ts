import { DataSheet } from "@/lib/data/dataSheets";
import { Form } from "@/lib/types/form";
import { Instance, types } from "mobx-state-tree";
import React from "react";
import { FALLBACK_FORM_DATA } from "../../constants/fallbackFormData";
import { FormDataModel, IFormDataModel } from "./formDataModel";
import { FormInfoModel, IFormInfoModel } from "./formInfoModel";

const EditorAppModel = types
	.model({
		formData: types.optional(types.maybeNull(FormDataModel), null),
		formInfo: types.optional(types.maybeNull(FormInfoModel), null),
	})
	.volatile(() => ({
		isInitialized: false,
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
			self.formInfo = FormInfoModel.create(formInfo);
			self.isInitialized = true;
		},
	}));

export const editorAppStore = EditorAppModel.create({});

export interface IEditorAppStore extends Instance<typeof EditorAppModel> {}

export const EditorAppStoreContext =
	React.createContext<IEditorAppStore | null>(null);
