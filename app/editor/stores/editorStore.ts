import { DataSheet } from '@/lib/data/dataSheets'
import { create } from 'zustand'
import { FALLBACK_FORM_DATA } from './fallbackFormData'

type EditorState = {
  formData: Record<string, unknown> | null
  formName: string | null
  // count: number
  // increment: () => void
  // reset: () => void
}

type EditorActions = {
  init: (dataSheet: DataSheet) => void
}

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
  // count: 0,
  // increment: () => set((state) => ({ count: state.count + 1 })),
  // reset: () => set({ count: 0 }),

  formData: null,
  formName: null,
  init: (dataSheet: DataSheet) => {
    console.log('init', dataSheet)
    const formData = JSON.parse(dataSheet.data)
    if (!formData.fieldSets?.length) {
      formData.fieldSets = [...FALLBACK_FORM_DATA.fieldSets]
    }

    set({ formData, formName: dataSheet.name })
  }
}))