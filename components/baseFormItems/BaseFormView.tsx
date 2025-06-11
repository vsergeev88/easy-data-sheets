// 'use client'
// import { FIELD_TYPES, Form } from "@/lib/types/form"
// import { useForm } from "react-hook-form"
// import {
//   Form as FormComponent,
// } from "@/components/ui/form"
// import { type BaseFieldsetProps } from "./BaseFieldset"
// import { Button } from "../ui/button"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { getFormDefaultValues, getFormSchema } from "./utils"
// import { FormSchema } from "./types"
// import { ButtonHTMLAttributes } from "react"
// import { DataSheet } from "@/lib/data/dataSheets"

type BaseFormViewProps = {
  children: React.ReactNode
}

export default function BaseFormView({ children }: BaseFormViewProps) {
  // const form = useForm<FormSchema>({
  //   defaultValues: getFormDefaultValues(formData),
  //   resolver: zodResolver(getFormSchema(formData)),
  // })

  return (
    <div className='mx-auto max-w-[980px] bg-white p-4 space-y-4'>
      {children}
      {/* <FormComponent {...form}>
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">{formInfo.name}</h1>
        <p className="text-sm text-gray-500 mb-4">
          {formData.description}
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          {children(form)}
          <Button {...submitButtonProps}>Submit</Button>
        </form>
      </FormComponent> */}
    </div>
  )
}
