import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form as FormComponent,
  // FormControl,
  // FormDescription,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
import { toast } from "sonner"
// import { Checkbox } from "@/components/ui/checkbox"
// import { CircleHelp, MessageCirclePlus } from "lucide-react"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Textarea } from "@/components/ui/textarea"
import TextAreaField from "../formItems/TextAreaField/TextAreaField"
import CheckboxField from "../formItems/CheckboxField/CheckboxField"
import Fieldset from "../Fieldset"
import { FIELD_TYPES } from "@/lib/types/form";
import type { Form } from "@/lib/types/form";

function getFormSchema(formData: Form) {
  const schema: Record<string, z.ZodSchema> = {}
  formData.fieldSets.forEach((fieldSet) => {
    fieldSet.fields.forEach((field) => {
      if (field.type === FIELD_TYPES.TEXT) {
        schema[field.name] = field.required
          ? z.string().min(1, { message: "This field is required" })
          : z.string().optional()
      } else if (field.type === FIELD_TYPES.CHECKBOX) {
        schema[field.name] = field.required
          ? z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          })
          : z.array(z.string()).optional()
      }
    })
  })
  return z.object(schema)
}

const DEFAULT_VALUES = {
  [FIELD_TYPES.TEXT]: "",
  [FIELD_TYPES.CHECKBOX]: [],
}

function getFormDefaultValues(formData: Form) {
  const defaultValues: Record<string, string | string[]> = {}
  formData.fieldSets.forEach((fieldSet) => {
    fieldSet.fields.forEach((field) => {
      defaultValues[field.name] = DEFAULT_VALUES[field.type]
    })
  })
  return defaultValues
}
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   phone: z.string(),
//   email: z.string(),
//   organization: z.string(),
//   place: z.string(),
//   time: z.string(),
//   number: z.string(),
//   items: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one item.",
//   }),
// })

// export function DrawerDemo() {
//   return (
//     <Drawer direction="right">
//       <DrawerTrigger asChild>
//         <Button variant="link" size="icon" type="button">
//           <CircleHelp />
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <div className="mx-auto w-full max-w-sm">
//           <DrawerHeader>
//             <DrawerTitle>Move Goal</DrawerTitle>
//             <DrawerDescription>Set your daily activity goal.</DrawerDescription>
//           </DrawerHeader>
//           <div className="p-4 pb-0">
//             <div className="flex items-center justify-center space-x-2">
//               <div className="flex-1 text-center">
//                 <div className="text-7xl font-bold tracking-tighter">
//                   Test
//                 </div>
//                 <div className="text-[0.70rem] uppercase text-muted-foreground">
//                   Calories/day
//                 </div>
//               </div>

//             </div>
//           </div>
//           <DrawerFooter>
//             <DrawerClose asChild>
//               <Button variant="outline">Close</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   )
// }

export default function FormView({ formData }: { formData: Form }) {
  const formSchema = getFormSchema(formData)
  const defaultValues = getFormDefaultValues(formData)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <FormComponent {...form}>
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">{formData.name}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {formData.description}
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formData.fieldSets.map((fieldSet, index) => {
          return (
            <Fieldset key={index} legend={`${index + 1}. ${fieldSet.legend}`} filledPercent={90}>
              {fieldSet.fields.map((field) => {
                const commonProps = {
                  control: form.control,
                }
                switch (field.type) {
                  case FIELD_TYPES.TEXT:
                    return <TextAreaField key={field.name} {...commonProps} {...field} />
                  case FIELD_TYPES.CHECKBOX:
                    return <CheckboxField key={field.name} {...commonProps} {...field} />
                }
              })}
            </Fieldset>
          )
        })}
        <Button type="submit">Submit</Button>
      </form>
    </FormComponent>
  )
}