import { FIELD_TYPES } from '@/lib/types/form'

import { Form } from '@/lib/types/form'
import { z } from 'zod'
import { DEFAULT_VALUES } from './constants'

export function getFormSchema(formData: Form) {
  const schema: Record<string, z.ZodSchema> = {}
  formData.fieldSets.forEach(fieldSet => {
    fieldSet.fields.forEach(field => {
      if (field.type === FIELD_TYPES.TEXT) {
        schema[field.name] = field.required
          ? z.string().min(1, { message: 'This field is required' })
          : z.string().optional()
      } else if (field.type === FIELD_TYPES.CHECKBOX) {
        schema[field.name] = field.required
          ? z.array(z.string()).refine(value => value.some(item => item), {
              message: 'You have to select at least one item.',
            })
          : z.array(z.string()).optional()
      }
    })
  })
  return z.object(schema)
}

export function getFormDefaultValues(formData: Form) {
  const defaultValues: Record<string, string | string[]> = {}
  formData.fieldSets.forEach(fieldSet => {
    fieldSet.fields.forEach(field => {
      defaultValues[field.name] = DEFAULT_VALUES[field.type]
    })
  })
  return defaultValues
}
