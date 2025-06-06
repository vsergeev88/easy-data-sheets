import React from 'react'

import {
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


type BaseFormItemProps = {
  children: React.ReactNode
  label: string
  description?: string
  onLabelClick?: () => void
}

const BaseFormItemWrapper: React.FC<BaseFormItemProps> = ({ onLabelClick, children, label, description }) => {
  return (<FormItem className="border border-gray-300 mb-1 md:mb-0 min-h-[80px] bg-gray-50 gap-0 ">
    <div className="flex relative sm:flex-row flex-col">
      <FormLabel className="px-2 pb-1 md:pb-2 md:w-[260px] md:min-w-[260px] flex flex-col justify-start items-start p-2" onClick={onLabelClick}>
        <div className="text-md">{label}</div>
        <FormDescription>{description}</FormDescription>
      </FormLabel>
      <div className="flex-1 border-l border-gray-300">
        {children}
      </div>
    </div>
    <FormMessage className="text-xs px-2 py-1 bg-red-50" />
  </FormItem>
  )
};

export default BaseFormItemWrapper