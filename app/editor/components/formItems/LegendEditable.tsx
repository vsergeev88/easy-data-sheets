import { useState } from "react";

import BaseFieldsetLegend from "@/components/baseFormItems/BaseFieldsetLegend";
import { cn } from "@/lib/utils";

export default function LegendEditable({
	legend,
	index,
	setLegend,
	className,
}: {
	legend: string;
	index: number;
	setLegend: (nextLegend: string) => void;
	className?: string;
}) {
	const [isEdit, setIsEdit] = useState(false);

	if (isEdit) {
		return (
			<input
				autoFocus
				className={cn(
					"flex w-full items-center justify-between gap-2 border-blue-500 border-b pl-4 font-medium text-lg outline-none",
					className
				)}
				onBlur={() => setIsEdit(false)}
				onChange={(e) => setLegend(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						setIsEdit(false);
					}
				}}
				value={legend}
			/>
		);
	}

	return (
		<BaseFieldsetLegend
			className={cn("inline hover:cursor-text hover:underline", className)}
			index={index}
			legend={legend ?? ""}
			onClick={() => setIsEdit(true)}
		/>
	);
}
