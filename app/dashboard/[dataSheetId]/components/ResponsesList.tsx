import type { ResponsesData } from "@/lib/data/datasheetResponses";

import ResponsesTable from "./ResponsesTable";

type ResponsesListProps = {
	responsesData: ResponsesData;
};

export const ResponsesList: React.FC<ResponsesListProps> = ({
	responsesData,
}) => {
	const { responses, total } = responsesData;
	console.log("responses", responses);
	return (
		<div>
			<h1>Responses</h1>
			<p>Total: {total}</p>
			{/* <ul>
				{responses.map((response) => (
					<li key={response.id}>{response.datasheetName}</li>
				))}
			</ul> */}
			<div className="px-2">
				<div className="bg-background px-2">
					<ResponsesTable responses={responses} />
				</div>
			</div>
		</div>
	);
};
