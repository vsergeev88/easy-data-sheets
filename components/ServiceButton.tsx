import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { Button, type ButtonProps } from "./ui/button";

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
					className={cn(className, "bg-background")}
					size="icon"
					type="button"
					variant="ghost"
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
