import { getResponsesByDatasheetId } from "@/lib/data/datasheetResponses";

export default async function DataSheetPage({
	params,
}: {
	params: Promise<{ dataSheetId: string }>;
}) {
	const { dataSheetId } = await params;
	const responses = await getResponsesByDatasheetId(dataSheetId, 100, 0, false);

	if (!responses) {
		return <div>responses not found</div>;
	}

	return (
		<div>
			<h1>Responses</h1>
			<pre>{JSON.stringify(responses, null, 2)}</pre>
		</div>
	);
}
