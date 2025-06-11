import { FIELD_TYPES, Form } from '@/lib/types/form'

export const FALLBACK_FORM_DATA: Pick<Form, 'fieldSets'> = {
  fieldSets: [
    {
      id: '1',
      legend: 'Personal Information',
      fields: [
        {
          id: '1',
          label: 'Name',
          description: 'Enter your name',
          type: FIELD_TYPES.TEXT,
          value: '',
          required: true,
          name: 'name',
        },
      ],
    },
  ],
}
