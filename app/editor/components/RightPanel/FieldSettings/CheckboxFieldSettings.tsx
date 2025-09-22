import { observer } from "mobx-react-lite";
import type { ICheckboxFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import { Label } from "@/components/ui/label";
import FieldLabelSettings from "./FieldLabelSettings";

const CheckboxFieldSettings = ({ field }: { field: ICheckboxFieldModel }) => {
	return (
		<div className="flex flex-col gap-4">
			<FieldLabelSettings field={field} />
			<div className="flex flex-col gap-2">
				<Label htmlFor="items" className="text-sm font-medium">
					Items
				</Label>
				{field.items.map((item) => (
					<div key={item} className="flex gap-2 items-center">
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default observer(CheckboxFieldSettings);
