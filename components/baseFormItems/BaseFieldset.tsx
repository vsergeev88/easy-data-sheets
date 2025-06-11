import React from 'react'
import { cn } from '@/lib/utils'
import { FieldSet } from '@/lib/types/form'

export type BaseFieldsetProps = {
  children: React.ReactNode
  fieldSet: FieldSet
  className?: string
  onLegendClick?: () => void
  index: number
}
const BaseFieldset: React.FC<BaseFieldsetProps> = ({ children, className }) => {
  return (
    <fieldset
      className={cn('relative border border-gray-300 bg-gray-300 p-4 px-1 py-1 pb-0', className)}
    >
      {children}
    </fieldset>
  )
}
export default BaseFieldset
