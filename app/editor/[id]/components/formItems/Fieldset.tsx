import { useEditorAppStore } from "@editorAppStore";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { CornerDownRight, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import type React from "react";
import { useEffect, useMemo } from "react";
import type { IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import type { IFieldSetModel } from "@/app/editor/stores/editorAppStore/fieldSetModel";
import { confirmDialogManager } from "@/app/stores/confirmDialogStore";
import { ClickOutside } from "@/components/ClickOutside";
import { ServiceButton } from "@/components/ServiceButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AddFieldsetButton from "../AddFieldsetButton";
import { EDITOR_FIELD_COMPONENTS_MAP } from "./editorFieldComponentsMap";
import LegendEditable from "./LegendEditable";

type FieldsetProps = {
	fieldSet: IFieldSetModel;
	className?: string;
	index: number;
};

const Fieldset: React.FC<FieldsetProps> = ({
	fieldSet,
	className,
	index,
}) => {
	const { safeFormData } = useEditorAppStore();
	const isSelected = safeFormData.selectedFieldSetId === fieldSet.id;

	const fieldsetFields = useMemo(() => fieldSet.fields, [fieldSet.fields]);

	const [parent, draggableFields, setValues] = useDragAndDrop<
		HTMLDivElement,
		IFieldModel
	>(fieldSet.fields, {
		onSort: (data) => {
			fieldSet.setFields(data.values as IFieldModel[]);
		},
	});

	useEffect(() => {
		setValues(fieldsetFields);
	}, [fieldsetFields, setValues]);

	const handleRemoveFieldset = () => {
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
			onClickOutside={() => {
				safeFormData.setSelectedFieldSetId(null);
				safeFormData.setSelectedFieldId(null);
			}}
			ignoreClass="ignore-deselect"
			className="space-y-4"
		>
			<div
				onClick={() => {
					safeFormData.setSelectedFieldSetId(fieldSet.id);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						safeFormData.setSelectedFieldSetId(fieldSet.id);
					}
				}}
				className={cn("border-2 border-dashed border-transparent", {
					"border-blue-500": isSelected,
					"hover:border-blue-500/50": !isSelected,
				})}
			>
				<fieldset
					className={cn(
						"relative border border-gray-300 bg-gray-300 p-4 px-1 py-1",
						className,
					)}
				>
					<div className="flex flex-row items-center justify-between min-h-10 gap-4 my-1">
						<LegendEditable
							legend={fieldSet.legend ?? ""}
							index={index}
							setLegend={(legend) => fieldSet.setLegend(legend)}
							className="max-w-prose"
						/>
						{isSelected && (
							<div className="flex flex-row items-center justify-between">
								<ServiceButton
									onClick={handleRemoveFieldset}
									icon={<Trash2 />}
									tooltip="Delete section"
									className="bg-transparent"
								/>
							</div>
						)}
					</div>
					{draggableFields.length > 0 ? (
						<div ref={parent} className="">
							{draggableFields.map((field) => {
								const FieldComponent = EDITOR_FIELD_COMPONENTS_MAP[
									field.type
								] as React.FC<{ field: IFieldModel }>;
								return (
									<FieldComponent
										key={field.id}
										field={field}
									/>
								);
							})}
						</div>
					) : (
						<div className="flex flex-col items-start">
							<div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
								<CornerDownRight className="w-4 h-4" />
								<div className="flex items-center">
									Start with adding &nbsp;
									<Button
										variant="link"
										size="sm"
										className="text-gray-500 p-0 underline underline-offset-4 cursor-pointer hover:text-gray-700"
										onClick={() => safeFormData.addTextInput(fieldSet.id)}
									>
										Text Input
									</Button>
									&nbsp;or other basic elements from the left panel
								</div>
							</div>
							<div className="flex items-center gap-2 text-gray-500 text-sm">
								<CornerDownRight className="w-4 h-4" />
								<Button
									variant="link"
									size="sm"
									className="p-0 underline underline-offset-4 cursor-pointer text-gray-500 hover:text-gray-700"
								>
									Use section template{" "}
								</Button>
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
