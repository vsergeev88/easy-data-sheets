import { auth } from "@clerk/nextjs/server";

import { getResponsesByAuthorId } from "@/lib/data/datasheetResponses";

import { ResponsesList } from "../components/ResponsesList";

const LIMIT = 500;
const OFFSET = 0;

export default async function Dashboard() {
	const { userId } = await auth();
	if (!userId) {
		return <div>Please log in to choose a plan.</div>;
	}

	const responsesData = await getResponsesByAuthorId(
		userId,
		LIMIT,
		OFFSET,
		false
	);

	return (
		<div>
			<ResponsesList responsesData={responsesData} withName />
		</div>
	);
}
