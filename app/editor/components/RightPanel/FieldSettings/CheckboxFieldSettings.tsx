import type { ICheckboxFieldModel } from "@/app/editor/stores/editorAppStore/fields/checkboxFieldModel";

import { observer } from "mobx-react-lite";

import { Label } from "@/components/ui/label";

import FieldLabelSettings from "./FieldLabelSettings";

export type CheckboxFieldSettingsProps = {
	field: ICheckboxFieldModel;
};

const CheckboxFieldSettings = ({ field }: CheckboxFieldSettingsProps) => {
	return (
		<div className="flex flex-col gap-4">
			<FieldLabelSettings field={field} />
			<div className="flex flex-col gap-2">
				<Label className="font-medium text-sm" htmlFor="items">
					Items
				</Label>
				{field.items.map((item) => (
					<div className="flex items-center gap-2" key={item}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default observer(CheckboxFieldSettings);
