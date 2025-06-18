import { DataSheet } from '@/lib/data/dataSheets'
import LeftPanel from './LeftPanel'
import FormView from './FormView'
import { Suspense, useEffect } from 'react'
import RightPanel from './RightPanel'
import { useEditorAppStore } from '@editorAppStore'

export type EditorClientProps = {
  dataSheet: DataSheet
}

export default function EditorClient({ dataSheet }: EditorClientProps) {
  const { init } = useEditorAppStore()
  useEffect(() => {
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
