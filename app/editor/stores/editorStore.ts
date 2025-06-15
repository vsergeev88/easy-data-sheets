import { DataSheet } from '@/lib/data/dataSheets'
import { create } from 'zustand'
import { FALLBACK_FORM_DATA } from './fallbackFormData'
import { Field, FieldSet, Form } from '@/lib/types/form'

type EditorStore = {
  formData: Form | null
  formInfo: Omit<DataSheet, 'data'> | null
  init: (dataSheet: DataSheet) => void
  selectedFieldSetId: string | null
  setSelectedFieldSetId: (id: string | null) => void
  selectedFieldId: string | null
  setSelectedFieldId: (id: string | null) => void
  addEmptySection: (afterId?: string | null) => void
  removeFieldSet: (sectionId: string) => void
  setLegend: (fieldSetId: string, legend: string) => void
  addField: (fieldSetId: string | null, field: Field) => void
  removeField: (fieldId: string) => void
  duplicateField: (fieldId: string) => void
  reorderFields: (fieldSetId: string, newFields: Field[]) => void
  moveField: ({
    fieldId,
    toFieldSetId,
  }: { fieldId: string, toFieldSetId: string, toFieldIndex: number }) => void
}

export const useEditorStore = create<EditorStore>((set, get) => {
  const getFieldSetId = (fieldId: string) => {
    const { formData } = get()
    const fieldSetId = formData?.fieldSets.find(section => section.fields.some(field => field.id === fieldId))?.id
    return fieldSetId ?? null
  }

  return {
  formData: null,
  formInfo: null,
  init: (dataSheet: DataSheet) => {
    const { data, ...formInfo } = dataSheet

    const formData = JSON.parse(data)
    if (!formData.fieldSets?.length) {
      formData.fieldSets = [...FALLBACK_FORM_DATA.fieldSets]
    }

    set({ formData, formInfo })
  },
  selectedFieldSetId: null,
  setSelectedFieldSetId: id => set({ selectedFieldSetId: id }),
  selectedFieldId: null,
  setSelectedFieldId: id => set({ selectedFieldId: id }),
  addEmptySection: afterId => {
    const { formData, formInfo } = get()
    if (!formData || !formInfo) return

    const newSection: FieldSet = {
      id: crypto.randomUUID(),
      fields: [],
      legend: 'New section',
    }

    const updatedFieldSets = [...(formData.fieldSets as FieldSet[])]

    if (afterId) {
      const afterIndex = updatedFieldSets.findIndex(section => section.id === afterId)
      if (afterIndex !== -1) {
        updatedFieldSets.splice(afterIndex + 1, 0, newSection)
      }
    } else {
      updatedFieldSets.push(newSection)
    }

    set({ formData: { ...formData, fieldSets: updatedFieldSets } })
    set({ selectedFieldSetId: newSection.id })
  },
  removeFieldSet: (sectionId) => {
    const { formData } = get()
    if (!formData) return

    const updatedFieldSets = [...(formData.fieldSets as FieldSet[])]
    const fieldSetIndex = updatedFieldSets.findIndex(section => section.id === sectionId)
    if (fieldSetIndex !== -1) {
      updatedFieldSets.splice(fieldSetIndex, 1)
    }

    set({ formData: { ...formData, fieldSets: updatedFieldSets } })
    set({ selectedFieldSetId: null })
    set({ selectedFieldId: null })
  },
  setLegend: (fieldSetId, legend) => {
    const { formData } = get()
    if (!formData) return

    const updatedFieldSets = [...(formData.fieldSets as FieldSet[])]
    const fieldSetIndex = updatedFieldSets.findIndex(section => section.id === fieldSetId)
    if (fieldSetIndex !== -1) {
      updatedFieldSets[fieldSetIndex].legend = legend
    }

    set({ formData: { ...formData, fieldSets: updatedFieldSets } })
  },
  addField: (fieldSetId, field) => {
    const { formData } = get()
    if (!formData) {
      console.error('formData is null')
      return
    }

    const updatedFieldSets = [...(formData.fieldSets as FieldSet[])]
    const fieldSetIndex = updatedFieldSets.findIndex(section => section.id === fieldSetId)
    if (fieldSetIndex !== -1) {
      updatedFieldSets[fieldSetIndex].fields.push(field)
    } else {
      updatedFieldSets[updatedFieldSets.length - 1].fields.push(field)
    }

    set({ formData: { ...formData, fieldSets: updatedFieldSets } })
    set({ selectedFieldId: field.id })
  },
  removeField: fieldId => {
    const { formData } = get()
    if (!formData) return

    const updatedFieldSets = [...(formData.fieldSets as FieldSet[])]
    const fieldSetIndex = updatedFieldSets.findIndex(fieldSet => fieldSet.fields.some(field => field.id === fieldId))
    if (fieldSetIndex === -1) {
      console.error('fieldSetIndex is -1, fieldId:', fieldId)
      return
    }

    updatedFieldSets[fieldSetIndex].fields = updatedFieldSets[fieldSetIndex].fields.filter(
      field => field.id !== fieldId,
    )

    set({ formData: { ...formData, fieldSets: updatedFieldSets } })
    set({ selectedFieldId: null })
    console.log('removeField', fieldId)
  },
  moveField: ({
    fieldId,
    toFieldSetId,
  }: { fieldId: string, toFieldSetId: string, toFieldIndex: number }) => {
    const { formData } = get()
    if (!formData) return
    // TODO: Implement move field
  },

  duplicateField: (fieldId: string) => {
    const { formData } = get()
    if (!formData) return

    const fieldSetId = getFieldSetId(fieldId)
    const field = formData.fieldSets.find(section => section.id === fieldSetId)?.fields.find(field => field.id === fieldId)
    if (!field) return

    const newField = { ...field, id: crypto.randomUUID() }
    const updatedFieldSets = [...(formData.fieldSets as FieldSet[])]
    const fieldSetIndex = updatedFieldSets.findIndex(section => section.id === fieldSetId)
    if (fieldSetIndex !== -1) {
      const fieldIndex = updatedFieldSets[fieldSetIndex].fields.findIndex(fieldItem => fieldItem.id === field.id)
      if (fieldIndex !== -1) {
        updatedFieldSets[fieldSetIndex].fields.splice(fieldIndex, 0, newField)
      }
    }
    set({ formData: { ...formData, fieldSets: updatedFieldSets } })
  },

  reorderFields: (fieldSetId, newFields) => {
    const { formData } = get()
    if (!formData) return

    const updatedFieldSets = [...(formData.fieldSets as FieldSet[])]
    const fieldSetIndex = updatedFieldSets.findIndex(section => section.id === fieldSetId)
    if (fieldSetIndex !== -1) {
      updatedFieldSets[fieldSetIndex].fields = newFields
    }

    set({ formData: { ...formData, fieldSets: updatedFieldSets } })
  }
}})
