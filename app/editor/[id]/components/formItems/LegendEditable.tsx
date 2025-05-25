import BaseFieldsetLegend from "@/components/baseFormItems/BaseFieldsetLegend"
import { useState } from "react"

export default function LegendEditable({ legend, index, setLegend }: { legend: string, index: number, setLegend: (legend: string) => void }) {
  const [isEdit, setIsEdit] = useState(false)

  if (isEdit) {
    return <input
      value={legend}
      onChange={(e) => setLegend(e.target.value)}
      onBlur={() => setIsEdit(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setIsEdit(false)
        }
      }}
      className="text-lg font-medium mb-4 flex items-center justify-between gap-2 w-full border-b border-blue-500 outline-none pl-4"
      autoFocus
    />
  }

  return <BaseFieldsetLegend legend={legend ?? ''} index={index}
    className="hover:cursor-pointer hover:text-underline"
    onClick={() => setIsEdit(true)}
  />
}