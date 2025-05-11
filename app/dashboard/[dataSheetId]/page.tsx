import { getDataSheet } from "@/lib/data/dataSheets";

export default async function DataSheetPage({ params }: { params: { dataSheetId: string } }) {
  const dataSheet = await getDataSheet(params.dataSheetId);

  if (!dataSheet) {
    return <div>DataSheet not found</div>;
  }

  const data = JSON.parse(dataSheet.data);

  return <div>
    <h1>{dataSheet.name}</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>;
}