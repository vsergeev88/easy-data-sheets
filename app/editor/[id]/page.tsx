import { getDataSheet } from "@/lib/data/dataSheets";
import { EditorClientApp } from "./EditorClientApp";

async function Editor({ params }: { params: { id: string } }) {
	const { id } = await params;
	const dataSheet = await getDataSheet(id);
	console.log('dataSheet', dataSheet);

	return <EditorClientApp dataSheet={dataSheet} />;
}

export default Editor;
