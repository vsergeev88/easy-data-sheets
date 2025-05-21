import { getDataSheet } from "@/lib/data/dataSheets";
import EditorClient from "./EditorClient";

async function Editor({ params }: { params: { id: string } }) {
  const { id } = await params
  const dataSheet = await getDataSheet(id)

  return <EditorClient dataSheet={dataSheet} />
}


export default Editor