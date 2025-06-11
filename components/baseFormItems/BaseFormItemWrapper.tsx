import React from 'react'

import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

type BaseFormItemProps = {
  children: React.ReactNode
  label: string
  description?: string
  onLabelClick?: () => void
  focusable?: boolean
}

const BaseFormItemWrapper: React.FC<BaseFormItemProps> = ({
  onLabelClick,
  children,
  label,
  description,
  focusable = true,
}) => {
  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!focusable) {
      e.preventDefault()
    }
    onLabelClick?.()
  }
  return (
    <FormItem className='relative mb-1 min-h-[80px] gap-0 border border-gray-300 bg-gray-50 md:mb-0'>
      <div className='relative flex flex-col sm:flex-row'>
        <FormLabel
          className='flex flex-col items-start justify-start p-2 px-2 pb-1 md:w-[260px] md:min-w-[260px] md:pb-2'
          onClick={handleLabelClick}
        >
          <div className='text-md'>{label}</div>
          <FormDescription>{description}</FormDescription>
        </FormLabel>
        <div className='flex-1 border-l border-gray-300'>{children}</div>
      </div>
      <FormMessage className='bg-red-50 px-2 py-1 text-xs' />
    </FormItem>
  )
}

export default BaseFormItemWrapper
