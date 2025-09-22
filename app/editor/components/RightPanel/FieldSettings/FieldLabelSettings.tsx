import type { IEditorFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";

import { observer } from "mobx-react-lite";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FieldLabelSettings = ({ field }: { field: IEditorFieldModel }) => {
	const { label, description } = field;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Label className="font-medium text-sm" htmlFor="label">
					Label
				</Label>
				<Input
					className="w-full border border-gray-300 p-2"
					id="label"
					onBlur={() => {
						field.setLabel(label);
					}}
					onChange={(e) => field.setLabel(e.target.value)}
					type="text"
					value={label}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label className="font-medium text-sm" htmlFor="description">
					Description
				</Label>
				<Textarea
					className="w-full border border-gray-300 p-2"
					id="description"
					onBlur={() => {
						field.setDescription(description ?? "");
					}}
					onChange={(e) => field.setDescription(e.target.value)}
					value={description}
				/>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox
					checked={field.required}
					id="required"
					onCheckedChange={(checked) => {
						field.setRequired(Boolean(checked));
					}}
				/>
				<Label className="font-normal text-sm" htmlFor="required">
					Required
				</Label>
			</div>
		</div>
	);
};

export default observer(FieldLabelSettings);
