type BaseFieldsetLegendProps = {
  legend: string
  index: number
}

export default function BaseFieldsetLegend({ legend, index }: BaseFieldsetLegendProps) {
  return (
    <div className="text-lg font-medium mb-4 flex items-center justify-between gap-2 w-full">
      {`${index + 1}. ${legend}`}
    </div>)
}