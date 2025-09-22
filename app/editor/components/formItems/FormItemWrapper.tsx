import { useEditorAppStore } from "@editorAppStore";
import { ArrowDownUp, CopyPlus, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import type React from "react";
import type { IBareFieldModel } from "@/app/stores/bareStores/bareFieldModel";
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
	const isSelected = safeFormData.selectedFieldId === field.id;

	const handleClick = (
		e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
	) => {
		e.stopPropagation();
		safeFormData.setSelectedFieldId(field.id);
	};

	return (
		<ClickOutside
			ignoreClass="ignore-deselect"
			onClickOutside={() => safeFormData.setSelectedFieldId(null)}
		>
			<div
				className={cn("ignore-deselect w-full border-2 border-transparent", {
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
				<BaseFormItemWrapper field={field}>
					{isSelected && (
						<div className="absolute top-0 right-0 flex flex-row items-center justify-between">
							<ServiceButton
								icon={<ArrowDownUp />}
								onClick={() => {}}
								tooltip="Move to..."
							/>
							<ServiceButton
								icon={<CopyPlus />}
								onClick={() => {
									safeFormData.duplicateField(field.id);
								}}
								tooltip="Duplicate field"
							/>
							<ServiceButton
								className="hover:text-red-700"
								icon={<Trash2 />}
								onClick={(e) => {
									e.stopPropagation();
									safeFormData.removeField(field.id);
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
