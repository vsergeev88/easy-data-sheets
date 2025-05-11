import { getDataSheet } from "@/lib/data/dataSheets";

async function Editor({ params }: { params: { id: string } }) {
  const { id } = await params
  const dataSheet = await getDataSheet(id)

  return <div>Editor {dataSheet.id}
    <pre>{JSON.stringify(dataSheet, null, 2)}</pre>
  </div>
}


export default Editor