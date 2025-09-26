import type React from "react";
import type { IBareFieldModel } from "@/app/stores/bareStores/bareFieldModel";

import { useEditorAppStore } from "@editorAppStore";
import { ArrowDownUp, CopyPlus, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";

import BaseFormItemWrapper from "@/components/baseFormItems/BaseFormItemWrapper";
import { ClickOutside } from "@/components/ClickOutside";
import { ServiceButton } from "@/components/ServiceButton";
import { cn } from "@/lib/utils";

type FormItemProps = {
	children: React.ReactNode;
	field: IBareFieldModel;
};

const FormItemWrapper: React.FC<FormItemProps> = ({ children, field }) => {
	const { safeFormData } = useEditorAppStore();
	// Store field.id in a local variable to prevent accessing removed MST nodes
	const fieldId = field.id;
	const isSelected = safeFormData.selectedFieldId === fieldId;

	// Early return if field is no longer valid (has been removed from tree)
	if (!fieldId) {
		return null;
	}

	const handleClick = (
		e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
	) => {
		e.stopPropagation();
		safeFormData.setSelectedFieldId(fieldId);
	};

	return (
		<ClickOutside
			ignoreClass="ignore-deselect"
			onClickOutside={() => safeFormData.setSelectedFieldId(null)}
		>
			<div
				className={cn(
					"ignore-deselect w-full border-2 border-transparent text-left",
					{
						"border-blue-500": isSelected,
						"hover:border-blue-500/50": !isSelected,
					}
				)}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleClick(e);
					}
				}}
			>
				<BaseFormItemWrapper field={field}>
					{isSelected && (
						<div className="absolute top-0 right-0 flex flex-row items-center justify-between">
							<ServiceButton
								icon={<ArrowDownUp />}
								onClick={() => {
									// TODO: Implement move functionality
								}}
								tooltip="Move to..."
							/>
							<ServiceButton
								icon={<CopyPlus />}
								onClick={() => {
									safeFormData.duplicateField(fieldId);
								}}
								tooltip="Duplicate field"
							/>
							<ServiceButton
								className="hover:text-red-700"
								icon={<Trash2 />}
								onClick={(e) => {
									e.stopPropagation();
									safeFormData.removeField(fieldId);
								}}
								tooltip="Delete field"
								variant="destructive"
							/>
						</div>
					)}
					<div className="pointer-events-none select-none">{children}</div>
				</BaseFormItemWrapper>
			</div>
		</ClickOutside>
	);
};

export default observer(FormItemWrapper);
