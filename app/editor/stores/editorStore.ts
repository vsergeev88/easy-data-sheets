import { DataSheet } from '@/lib/data/dataSheets'
import { create } from 'zustand'
import { FALLBACK_FORM_DATA } from './fallbackFormData'
import { FieldSet } from '@/lib/types/form'

type EditorStore = {
  formData: Record<string, unknown> | null
  formInfo: Omit<DataSheet, "data"> | null
  init: (dataSheet: DataSheet) => void
  selectedFieldSetId: string | null
  setSelectedFieldSetId: (id: string | null) => void
  selectedFieldId: string | null
  setSelectedFieldId: (id: string | null) => void
  addEmptySection: (afterId?: string | null) => void
}

export const useEditorStore = create<EditorStore>((set, get) => ({
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
  setSelectedFieldSetId: (id) => set({ selectedFieldSetId: id }),
  selectedFieldId: null,
  setSelectedFieldId: (id) => set({ selectedFieldId: id }),
  addEmptySection: (afterId) => {
    const { formData, formInfo } = get()
    if (!formData || !formInfo) return

    const newSection: FieldSet = {
      id: crypto.randomUUID(),
      fields: [],
      legend: 'New section'
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
  }
}))