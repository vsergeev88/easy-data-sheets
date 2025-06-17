'use client'

import { DataSheet } from '@/lib/data/dataSheets'
import { useEditorStore } from '../stores/editorStore'
import LeftPanel from './components/LeftPanel'
import FormView from './components/FormView'
import { useEffect } from 'react'
import RightPanel from './components/RightPanel'

type EditorClientProps = {
  dataSheet: DataSheet | null
}

export default function EditorClient({ dataSheet = null }: EditorClientProps) {
  const { init } = useEditorStore()

  useEffect(() => {
    if (!dataSheet) return
    init(dataSheet)
  }, [dataSheet, init])

  return (
    <div className='grid h-full grid-cols-[280px_1fr_340px] overflow-hidden'>
      <div className='h-full border-r border-gray-200'>
        <LeftPanel />
      </div>
      <div className='h-full flex-1 overflow-auto bg-gray-50 py-4'>
        <FormView />
      </div>
      <div className='h-full bg-gray-50'>
        <RightPanel />
      </div>
    </div>
  )
}
