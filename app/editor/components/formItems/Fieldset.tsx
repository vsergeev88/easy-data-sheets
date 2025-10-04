import type React from "react";
import type { IEditorFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import type { IEditorFieldSetModel } from "@/app/editor/stores/editorAppStore/fieldSetModel";

import { useEditorAppStore } from "@editorAppStore";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { CornerDownRight, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";

import { confirmDialogManager } from "@/app/stores/confirmDialogStore";
import { ClickOutside } from "@/components/ClickOutside";
import { ServiceButton } from "@/components/ServiceButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import AddFieldsetButton from "../AddFieldsetButton";
import { EDITOR_FIELD_COMPONENTS_MAP } from "./editorFieldComponentsMap";
import LegendEditable from "./LegendEditable";

type FieldsetProps = {
	fieldSet: IEditorFieldSetModel;
	className?: string;
	index: number;
};

const Fieldset: React.FC<FieldsetProps> = ({ fieldSet, className, index }) => {
	const { safeFormData } = useEditorAppStore();
	const isSelected = safeFormData.selectedFieldSetId === fieldSet.id;

	const fieldsetFields = useMemo(() => fieldSet.fields, [fieldSet.fields]);

	const [parent, draggableFields, setValues] = useDragAndDrop<
		HTMLDivElement,
		IEditorFieldModel
	>(fieldSet.fields, {
		onSort: (data) => {
			fieldSet.setFields(data.values as IEditorFieldModel[]);
		},
	});

	useEffect(() => {
		setValues(fieldsetFields);
	}, [fieldsetFields, setValues]);

	const handleRemoveFieldset = () => {
		if (fieldsetFields.length === 0) {
			safeFormData.removeFieldSet(fieldSet.id);
			return;
		}
		confirmDialogManager.open({
			title: "Delete section",
			description:
				"Are you sure you want to delete this section? Content of this section will be lost.",
			onConfirm: () => {
				if (safeFormData.isSingleFieldSet) {
					safeFormData.addEmptyFieldSet(null);
				}
				safeFormData.removeFieldSet(fieldSet.id);
			},
			confirmText: "Delete section",
			variant: "destructive",
		});
	};

	return (
		<ClickOutside
			className="space-y-4"
			ignoreClass="ignore-deselect"
			onClickOutside={() => {
				safeFormData.setSelectedFieldSetId(null);
				safeFormData.setSelectedFieldId(null);
			}}
		>
			<div
				className={cn("border-2 border-transparent border-dashed", {
					"border-blue-500": isSelected,
					"hover:border-blue-500/50": !isSelected,
				})}
				onClick={() => {
					safeFormData.setSelectedFieldSetId(fieldSet.id);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						safeFormData.setSelectedFieldSetId(fieldSet.id);
					}
				}}
			>
				<fieldset
					className={cn(
						"relative border border-gray-300 bg-gray-300 p-4 px-1 py-1",
						className
					)}
				>
					<div className="my-1 flex min-h-10 flex-row items-center justify-between gap-4">
						<LegendEditable
							className="max-w-prose"
							index={index}
							legend={fieldSet.legend ?? ""}
							setLegend={(legend) => fieldSet.setLegend(legend)}
						/>
						{isSelected && fieldSet.id !== "contacts" && (
							<div className="flex flex-row items-center justify-between">
								<ServiceButton
									className="bg-transparent"
									icon={<Trash2 />}
									onClick={handleRemoveFieldset}
									tooltip="Delete section"
								/>
							</div>
						)}
					</div>
					{draggableFields.length > 0 ? (
						<div ref={parent}>
							{draggableFields.map((field) => {
								const FieldComponent = EDITOR_FIELD_COMPONENTS_MAP[
									field.type
								] as React.FC<{ field: IEditorFieldModel }>;
								return <FieldComponent field={field} key={field.id} />;
							})}
						</div>
					) : (
						<div className="flex flex-col items-start">
							<div className="mb-2 flex items-center gap-2 text-gray-500 text-sm">
								<CornerDownRight className="h-4 w-4" />
								<div className="flex items-center">
									Start with adding&nbsp;
									<span
										className="cursor-pointer underline underline-offset-4 hover:text-gray-700"
										onClick={() => safeFormData.addTextInput(fieldSet.id)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												safeFormData.addTextInput(fieldSet.id);
											}
										}}
									>
										Text Input
									</span>
									&nbsp;or other basic elements from the left panel
								</div>
							</div>
						</div>
					)}
				</fieldset>
			</div>
			{isSelected && <AddFieldsetButton fieldSetId={fieldSet.id} />}
		</ClickOutside>
	);
};
export default observer(Fieldset);
