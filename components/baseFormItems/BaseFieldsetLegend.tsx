import { cn } from "@/lib/utils";

type BaseFieldsetLegendProps = {
	legend: string;
	index: number;
	className?: string;
	onClick?: () => void;
};

export default function BaseFieldsetLegend({
	legend,
	index,
	className,
	onClick,
}: BaseFieldsetLegendProps) {
	return (
		<div
			className={cn(
				"flex w-full select-none items-center justify-between gap-2 pl-4 font-medium text-lg",
				className
			)}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					onClick?.();
				}
			}}
		>
			{`${index + 1}. ${legend}`}
		</div>
	);
}
