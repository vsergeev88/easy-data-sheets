import React from 'react'

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea'
// import { Button } from '@/components/ui/button'
// import { MessageCirclePlus } from 'lucide-react'

type FormItemProps = {
  field: any
  children: React.ReactNode
  label: string
  description?: string
}

const FormItemWrapper: React.FC<FormItemProps> = ({ field, children, label, description }) => {
  console.log(field)
  return (<FormItem className="border border-gray-300 mb-1 md:mb-0 min-h-[80px] bg-gray-50 gap-0 ">
    <div className="flex relative sm:flex-row flex-col">
      <div className="px-2 pb-1 md:pb-2 md:w-[260px] md:min-w-[260px]">
        <FormLabel className="text-md">{label}</FormLabel>
        <FormDescription>
          {description}
        </FormDescription>
      </div>
      <div className="flex-1 border-l border-gray-300">
        {children}
      </div>
      {/* <Button variant="link" type="button" className="text-xs absolute right-0 top-0 hover:text-gray-600 text-gray-400 ml-auto">
        <MessageCirclePlus size={16} />
      </Button> */}
    </div>
    <FormMessage className="text-xs px-2 py-1 bg-red-50" />
  </FormItem>
  )
};

export default FormItemWrapper