import { GripVertical } from "lucide-react";
import { observer } from "mobx-react-lite";
import type React from "react";
import type { IFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import {
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type BaseFormItemProps = {
	children: React.ReactNode;
	field: IFieldModel;
};

const BaseFormItemWrapper: React.FC<BaseFormItemProps> = ({
	field,
	children
}) => {
	const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
		if (!field.focusable) {
			e.preventDefault();
		}
		// onLabelClick?.();
	};
	return (
		<FormItem
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
				<FormLabel
					className={cn(
						"flex flex-col items-start justify-start p-2 px-2 pb-1 md:w-[260px] md:min-w-[260px] md:pb-2",
						{
							"cursor-grab": field.draggable,
						},
					)}
					onClick={handleLabelClick}
				>
					<div className="text-md flex items-center gap-1">
						{field.label}
						{field.required && <span className="text-red-500">*</span>}
					</div>
					<FormDescription>{field.description}</FormDescription>
				</FormLabel>
				<div className="flex-1 border-l border-gray-300">{children}</div>
			</div>
			<FormMessage className="bg-red-50 px-2 py-1 text-xs" />
		</FormItem>
	);
};

export default observer(BaseFormItemWrapper);
