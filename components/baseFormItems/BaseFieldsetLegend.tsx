import { cn } from "@/lib/utils"

type BaseFieldsetLegendProps = {
  legend: string
  index: number
  className?: string
  onClick?: () => void
}

export default function BaseFieldsetLegend({ legend, index, className, onClick }: BaseFieldsetLegendProps) {
  return (
    <div className={cn("text-lg font-medium mb-4 flex items-center justify-between gap-2 w-full select-none", className)} onClick={onClick} tabIndex={0}>
      {`${index + 1}. ${legend}`}
    </div>)
}