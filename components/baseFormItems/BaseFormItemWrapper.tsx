import type React from "react";
import type { IBareFieldModel } from "@/app/stores/bareStores/bareFieldModel";

import { GripVertical } from "lucide-react";
import { observer } from "mobx-react-lite";

import { cn } from "@/lib/utils";

type BaseFormItemProps = {
	children: React.ReactNode;
	field: IBareFieldModel;
};

const BaseFormItemWrapper: React.FC<BaseFormItemProps> = ({
	field,
	children,
}) => {
	const handleLabelClick = (
		e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
	) => {
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
				}
			)}
		>
			<div className="relative flex flex-col sm:flex-row">
				{field.draggable && (
					<div className="flex h-full w-8 items-center justify-center text-gray-300">
						<GripVertical className="h-6 w-6" />
					</div>
				)}
				<div
					className={cn(
						"flex flex-col items-start justify-start p-2 px-2 pb-1 md:w-[260px] md:min-w-[260px] md:pb-2",
						{
							"cursor-grab": field.draggable,
						}
					)}
					onClick={handleLabelClick}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleLabelClick(e);
						}
					}}
				>
					<div className="flex items-center gap-1 font-semibold text-md">
						{field.required && <span className="text-red-500">*</span>}
						{field.label}
					</div>
					<p className="text-gray-500 text-xs">{field.description}</p>
				</div>
				<div className="flex-1 border-gray-300 border-l">{children}</div>
			</div>
			{field.errorText && (
				<p className="bg-red-50 px-2 py-1 text-xs">{field.errorText}</p>
			)}
		</div>
	);
};

export default observer(BaseFormItemWrapper);
