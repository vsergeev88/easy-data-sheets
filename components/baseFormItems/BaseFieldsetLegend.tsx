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
				"flex w-full items-center justify-between gap-2 text-lg font-medium select-none",
				className,
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
