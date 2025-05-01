import { getDataSheet } from "@/lib/data/";

export default async function DataSheetPage({ params }: { params: { dataSheetId: string } }) {
  const dataSheet = await getDataSheet(params.dataSheetId);

  if (!dataSheet) {
    return <div>DataSheet not found</div>;
  }

  const data = JSON.parse(dataSheet.data);

  return <div>DataSheetPage</div>;
}