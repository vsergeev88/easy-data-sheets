import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

export const ServiceButton = ({
	icon,
	tooltip,
	className,
	...buttonProps
}: { icon: React.ReactNode; tooltip: string } & ButtonProps) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					{...buttonProps}
					size="icon"
					variant="ghost"
					className={cn(className, "bg-background")}
					type="button"
				>
					{icon}
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p className="text-xs">{tooltip}</p>
			</TooltipContent>
		</Tooltip>
	);
};
