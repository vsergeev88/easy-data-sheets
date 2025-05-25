'use client'

import { DataSheet } from "@/lib/data/dataSheets"
import { useEditorStore } from "../stores/editorStore"
import LeftPanel from "./components/LeftPanel"
import FormView from "./components/FormView"
import { useEffect } from "react"

type EditorClientProps = {
  dataSheet: DataSheet | null
}

export default function EditorClient({ dataSheet = null }: EditorClientProps) {
  const { init } = useEditorStore()

  useEffect(() => {
    if (!dataSheet) return
    init(dataSheet)
  }, [dataSheet, init])

  return <div className="grid grid-cols-[280px_1fr_280px] h-full overflow-hidden">
    <div className="border-r border-gray-200 h-full">
      <LeftPanel />
    </div>
    <div className="flex-1 overflow-auto h-full bg-gray-50 py-4">
      {/* <pre>{JSON.stringify(dataSheet, null, 2)}</pre> */}
      <FormView />
    </div>
    <div className="border-l border-gray-200 h-full">
      right panel
    </div>
  </div>
}