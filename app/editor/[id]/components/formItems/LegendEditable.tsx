import BaseFieldsetLegend from '@/components/baseFormItems/BaseFieldsetLegend'
import { useState } from 'react'

export default function LegendEditable({
  legend,
  index,
  setLegend,
}: {
  legend: string
  index: number
  setLegend: (legend: string) => void
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
        className='mb-4 flex w-full items-center justify-between gap-2 border-b border-blue-500 pl-4 text-lg font-medium outline-none'
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
