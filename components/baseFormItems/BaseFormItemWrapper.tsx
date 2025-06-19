import React from "react";

import {
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type BaseFormItemProps = {
	children: React.ReactNode;
	label: string;
	description?: string;
	onLabelClick?: () => void;
	focusable?: boolean;
	draggable?: boolean;
	required?: boolean;
};

const BaseFormItemWrapper: React.FC<BaseFormItemProps> = ({
	onLabelClick,
	children,
	label,
	description,
	focusable = true,
	draggable = false,
	required = false,
}) => {
	const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
		if (!focusable) {
			e.preventDefault();
		}
		onLabelClick?.();
	};
	return (
		<FormItem
			className={cn(
				"relative mb-1 min-h-[80px] gap-0 border border-gray-300 bg-gray-50 md:mb-0",
				{
					"cursor-grab": draggable,
				},
			)}
		>
			<div className="relative flex flex-col sm:flex-row">
				{draggable && (
					<div className="h-full flex items-center justify-center w-8 text-gray-300">
						<GripVertical className="w-6 h-6" />
					</div>
				)}
				<FormLabel
					className={cn(
						"flex flex-col items-start justify-start p-2 px-2 pb-1 md:w-[260px] md:min-w-[260px] md:pb-2",
						{
							"cursor-grab": draggable,
						},
					)}
					onClick={handleLabelClick}
				>
					<div className="text-md flex items-center gap-1">
						{label}
						{required && <span className="text-red-500">*</span>}
					</div>
					<FormDescription>{description}</FormDescription>
				</FormLabel>
				<div className="flex-1 border-l border-gray-300">{children}</div>
			</div>
			<FormMessage className="bg-red-50 px-2 py-1 text-xs" />
		</FormItem>
	);
};

export default BaseFormItemWrapper;
