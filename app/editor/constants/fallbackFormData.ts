import {
	FIELD_TYPES,
	type FieldSet,
	type Form,
	type TextField,
} from "@/lib/types/form";

export const FALLBACK_FORM_DATA: Pick<Form, "fieldSets"> = {
	fieldSets: [
		{
			id: "1",
			legend: "Personal Information",
			fields: [
				{
					id: "1",
					label: "Name",
					description: "Enter your name",
					type: FIELD_TYPES.TEXT,
					value: "",
					required: true,
					name: "name",
				} as TextField,
			],
		},
	],
};

export const EMPTY_FIELD_SET: Omit<FieldSet, "id"> = {
	fields: [],
	legend: "New section",
};
