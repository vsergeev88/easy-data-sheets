import type { ResponsesData } from "@/lib/data/datasheetResponses";

import ResponsesTable from "./ResponsesTable";

type ResponsesListProps = {
	responsesData: ResponsesData;
	withName?: boolean;
};

export const ResponsesList: React.FC<ResponsesListProps> = ({
	responsesData,
	withName,
}) => {
	const { responses } = responsesData;
	return (
		<div className="px-2">
			<div className="bg-background px-2">
				<ResponsesTable responses={responses} withName={withName} />
			</div>
		</div>
	);
};
