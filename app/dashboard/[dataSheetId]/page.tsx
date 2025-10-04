import { getResponsesByDatasheetId } from "@/lib/data/datasheetResponses";

import { ResponsesList } from "../components/ResponsesList";

const LIMIT = 100;
const OFFSET = 0;

export default async function DataSheetPage({
	params,
}: {
	params: Promise<{ dataSheetId: string }>;
}) {
	const { dataSheetId } = await params;
	const responsesData = await getResponsesByDatasheetId(
		dataSheetId,
		LIMIT,
		OFFSET,
		false
	);

	if (!responsesData) {
		return <div>responses not found</div>;
	}

	return (
		<div>
			<h1>Responses</h1>
			<ResponsesList responsesData={responsesData} />
		</div>
	);
}
