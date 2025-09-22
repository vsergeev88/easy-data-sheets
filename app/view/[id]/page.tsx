import { getDataSheet } from "@/lib/data/dataSheets";

import { ViewClientApp } from "./ViewClientApp";

async function ViewPage({ params }: { params: { id: string } }) {
	const { id } = await params;
	const dataSheet = await getDataSheet(id);

	return <ViewClientApp dataSheet={dataSheet} />;
}

export default ViewPage;
