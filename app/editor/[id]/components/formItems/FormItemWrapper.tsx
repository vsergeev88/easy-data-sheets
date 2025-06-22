import { useEditorAppStore } from "@editorAppStore";
import { ArrowDownUp, CopyPlus, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import type React from "react";
import type { IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import BaseFormItemWrapper from "@/components/baseFormItems/BaseFormItemWrapper";
import { ClickOutside } from "@/components/ClickOutside";
import { ServiceButton } from "@/components/ServiceButton";
import { cn } from "@/lib/utils";

type FormItemProps = {
	children: React.ReactNode;
	field: IFieldModel;
};

const FormItemWrapper: React.FC<FormItemProps> = ({
	children,
	field
}) => {
	const { safeFormData } = useEditorAppStore();
	const isSelected = safeFormData.selectedFieldId === field.id;

	const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
		e.stopPropagation();
		safeFormData.setSelectedFieldId(field.id);
	};

	return (
		<ClickOutside
			onClickOutside={() => safeFormData.setSelectedFieldId(null)}
			ignoreClass="ignore-deselect"
		>
			<div
				className={cn("border-2 border-transparent w-full ignore-deselect", {
					"border-blue-500": isSelected,
					"hover:border-blue-500/50": !isSelected,
				})}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleClick(e);
					}
				}}
			>
				<BaseFormItemWrapper
					field={field}
				>
					{isSelected && (
						<div className="absolute top-0 right-0 flex flex-row items-center justify-between">
							<ServiceButton
								icon={<ArrowDownUp />}
								tooltip="Move to..."
								onClick={() => { }}
							/>
							<ServiceButton
								icon={<CopyPlus />}
								tooltip="Duplicate field"
								onClick={() => {
									safeFormData.duplicateField(field.id);
								}}
							/>
							<ServiceButton
								icon={<Trash2 />}
								variant="destructive"
								tooltip="Delete field"
								onClick={(e) => {
									e.stopPropagation();
									safeFormData.removeField(field.id);
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

export default observer(FormItemWrapper);
