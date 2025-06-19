import { ArrowDownUp, CopyPlus, CornerDownRight, Trash2 } from "lucide-react";
import React from "react";

import { useEditorAppStore } from "@editorAppStore";
import BaseFormItemWrapper from "@/components/baseFormItems/BaseFormItemWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClickOutside } from "@/components/ClickOutside";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ServiceButton } from "@/components/ServiceButton";

type FormItemProps = {
	children: React.ReactNode;
	description?: string;
	fieldId: string;
	label: string;
	required?: boolean;
};

const FormItemWrapper: React.FC<FormItemProps> = ({
	children,
	description,
	fieldId,
	label,
	required = false,
}) => {
	const { safeFormData } = useEditorAppStore();
	const isSelected = safeFormData.selectedFieldId === fieldId;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		safeFormData.setSelectedFieldId(fieldId);
	};

	return (
		<ClickOutside
			onClickOutside={() => safeFormData.setSelectedFieldId(null)}
			ignoreClass="ignore-deselect"
		>
			<div
				className={cn("border-2 border-transparent w-full", {
					"border-blue-500": isSelected,
					"hover:border-blue-500/50": !isSelected,
				})}
				onClick={handleClick}
			>
				<BaseFormItemWrapper
					description={description}
					focusable={false}
					draggable={true}
					label={label}
					required={required}
				>
					{isSelected && (
						<div className="absolute top-0 right-0 flex flex-row items-center justify-between">
							<ServiceButton
								icon={<ArrowDownUp />}
								tooltip="Move to..."
								onClick={() => {}}
							/>
							<ServiceButton
								icon={<CopyPlus />}
								tooltip="Duplicate field"
								onClick={() => {
									safeFormData.duplicateField(fieldId);
								}}
							/>
							<ServiceButton
								icon={<Trash2 />}
								variant="destructive"
								tooltip="Delete field"
								onClick={(e) => {
									e.stopPropagation();
									safeFormData.removeField(fieldId);
								}}
								className="hover:text-red-700"
							/>
						</div>
					)}
					<div className="pointer-events-none select-none">{children}</div>
				</BaseFormItemWrapper>
			</div>
		</ClickOutside>
	);
};

export default FormItemWrapper;
