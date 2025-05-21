import { getFormSchema } from "./utils"
import { z } from "zod"

export type FormSchema = z.infer<ReturnType<typeof getFormSchema>>
