import { cast, type Instance, types } from "mobx-state-tree";
import { FieldModel, type IFieldModel } from "./fieldModel";

export const FieldSetModel = types
	.model({
		id: types.identifier,
		legend: types.maybeNull(types.string),
		fields: types.array(FieldModel),
	})
	.volatile(() => ({
		isInViewPort: false,
	}))
	.actions((self) => ({
		setLegend: (legend: string): void => {
			self.legend = legend;
		},
		setFields: (fields: IFieldModel[]): void => {
			self.fields = cast(fields);
		},
		setIsInViewPort: (isInViewPort: boolean): void => {
			self.isInViewPort = isInViewPort;
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

export interface IFieldSetModel extends Instance<typeof FieldSetModel> {}
