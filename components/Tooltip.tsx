import { TooltipContent, Tooltip as TooltipPrimitive, TooltipTrigger } from "./ui/tooltip";

export const Tooltip = ({ children, message }: { children: React.ReactNode, message: string }) => {
  return (
    <TooltipPrimitive>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">{message}</p>
      </TooltipContent>
    </TooltipPrimitive>
  )
}