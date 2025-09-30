import { getDataSheet } from "@/lib/data/dataSheets";

import { EditorClientApp } from "./EditorClientApp";

async function EditorPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const dataSheet = await getDataSheet(id);
	console.log("dataSheet", dataSheet);

	return <EditorClientApp dataSheet={dataSheet} />;
}

export default EditorPage;
