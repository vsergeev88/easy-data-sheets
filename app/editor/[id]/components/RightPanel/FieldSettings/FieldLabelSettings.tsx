import { observer } from "mobx-react-lite";
import { useState } from "react";
import type { IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FieldLabelSettings = ({ field }: { field: IFieldModel }) => {
	const { label, description } = field;
	const [labelValue, setLabelValue] = useState(label);
	const [descriptionValue, setDescriptionValue] = useState(description);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<Label htmlFor="label" className="text-sm font-medium">
					Label
				</Label>
				<Input
					type="text"
					id="label"
					className="w-full p-2 border border-gray-300"
					value={labelValue}
					onChange={(e) => setLabelValue(e.target.value)}
					onBlur={() => {
						field.setLabel(labelValue);
					}}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<Label htmlFor="description" className="text-sm font-medium">
					Description
				</Label>
				<Textarea
					id="description"
					className="w-full p-2 border border-gray-300"
					value={descriptionValue}
					onChange={(e) => setDescriptionValue(e.target.value)}
					onBlur={() => {
						field.setDescription(descriptionValue ?? "");
					}}
				/>
			</div>
			<div className="flex gap-2 items-center">
				<Checkbox
					id="required"
					checked={field.required}
					onCheckedChange={(checked) => {
						field.setRequired(Boolean(checked));
					}}
				/>
				<Label htmlFor="required" className="text-sm font-normal">
					Required
				</Label>
			</div>
		</div>
	);
};

export default observer(FieldLabelSettings);