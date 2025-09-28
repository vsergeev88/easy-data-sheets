import type { ICheckboxFieldModel } from "@/app/editor/stores/editorAppStore/fields/checkboxFieldModel";

import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { EditableText } from "@/components/EditableText";
import { ServiceButton } from "@/components/ServiceButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import FieldLabelSettings from "./FieldLabelSettings";

export type CheckboxFieldSettingsProps = {
	field: ICheckboxFieldModel;
};

const CheckboxFieldSettings = ({ field }: CheckboxFieldSettingsProps) => {
	const [newItem, setNewItem] = useState("");

	const [parent, draggableItems, setItems] = useDragAndDrop<
		HTMLDivElement,
		string
	>(field.items, {
		onSort: (data) => {
			field.setItems(data.values as string[]);
		},
		dragHandle: ".dragHandle",
	});

	useEffect(() => {
		setItems(field.items);
	}, [field.items, setItems]);

	return (
		<div className="ignore-deselect flex flex-col gap-4">
			<FieldLabelSettings field={field} />
			<div className="flex flex-col gap-2">
				<Label className="font-medium text-sm" htmlFor="items">
					Items
				</Label>
				<div className="flex flex-col gap-2" ref={parent}>
					{draggableItems.map((item, index) => (
						<div className="flex flex-row items-center gap-2" key={item}>
							<GripVertical className="dragHandle h-4 min-w-4 max-w-4 flex-1" />
							<EditableText
								className="ignore-deselect text-left"
								inputClassName="ignore-deselect px-0.5"
								lines={2}
								onBlur={(text) => field.editItem(text, index)}
								text={item}
							/>
							<ServiceButton
								icon={<Trash2 />}
								onClick={() => field.removeItem(index)}
								size="sm"
								tooltip="Delete item"
							/>
						</div>
					))}
				</div>
				<div className="flex flex-row gap-2">
					<input
						className="ignore-deselect border-1 px-1 text-left"
						onChange={(e) => setNewItem(e.target.value)}
						type="text"
						value={newItem}
					/>
					<ServiceButton
						className="ignore-deselect hover:text-green-700"
						icon={<Plus />}
						onClick={() => {
							field.addItem(newItem);
							setNewItem("");
						}}
						size="sm"
						tooltip="Add item"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Checkbox
						checked={field.withCustomField}
						id="withCustomField"
						onCheckedChange={(checked) => {
							field.setWithCustomField(Boolean(checked));
						}}
					/>
					<Label className="font-normal text-sm" htmlFor="withCustomField">
						With Custom Field
					</Label>
				</div>
			</div>
		</div>
	);
};

export default observer(CheckboxFieldSettings);
