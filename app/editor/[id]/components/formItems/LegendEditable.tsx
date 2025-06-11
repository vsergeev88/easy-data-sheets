import BaseFieldsetLegend from '@/components/baseFormItems/BaseFieldsetLegend'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function LegendEditable({
  legend,
  index,
  setLegend,
  className
}: {
  legend: string
  index: number
  setLegend: (legend: string) => void
  className?: string
}) {
  const [isEdit, setIsEdit] = useState(false)

  if (isEdit) {
    return (
      <input
        value={legend}
        onChange={e => setLegend(e.target.value)}
        onBlur={() => setIsEdit(false)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setIsEdit(false)
          }
        }}
        className={cn('mb-4 flex w-full items-center justify-between gap-2 border-b border-blue-500 pl-4 text-lg font-medium outline-none', className)}
        autoFocus
      />
    )
  }

  return (
    <BaseFieldsetLegend
      legend={legend ?? ''}
      index={index}
      className='hover:text-underline hover:cursor-pointer'
      onClick={() => setIsEdit(true)}
    />
  )
}
