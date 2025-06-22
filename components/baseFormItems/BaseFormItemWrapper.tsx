import { GripVertical } from "lucide-react";
import { observer } from "mobx-react-lite";
import type React from "react";
import type { IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import { cn } from "@/lib/utils";

type BaseFormItemProps = {
	children: React.ReactNode;
	field: IFieldModel;
};

const BaseFormItemWrapper: React.FC<BaseFormItemProps> = ({
	field,
	children
}) => {
	const handleLabelClick = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
		if (!field.focusable) {
			e.preventDefault();
		}
	};
	return (
		<div
			className={cn(
				"relative mb-1 min-h-[80px] gap-0 border border-gray-300 bg-gray-50 md:mb-0",
				{
					"cursor-grab": field.draggable,
				},
			)}
		>
			<div className="relative flex flex-col sm:flex-row">
				{field.draggable && (
					<div className="h-full flex items-center justify-center w-8 text-gray-300">
						<GripVertical className="w-6 h-6" />
					</div>
				)}
				<div
					className={cn(
						"flex flex-col items-start justify-start p-2 px-2 pb-1 md:w-[260px] md:min-w-[260px] md:pb-2",
						{
							"cursor-grab": field.draggable,
						},
					)}
					onClick={handleLabelClick}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleLabelClick(e);
						}
					}}
				>
					<div className="text-md flex items-center gap-1 font-semibold">
						{field.required && <span className="text-red-500">*</span>}
						{field.label}
					</div>
					<p>{field.description}</p>
				</div>
				<div className="flex-1 border-l border-gray-300">{children}</div>
			</div>
			{field.errorText && <p className="bg-red-50 px-2 py-1 text-xs" >{field.errorText}</p>}
		</div>
	);
};

export default observer(BaseFormItemWrapper);
