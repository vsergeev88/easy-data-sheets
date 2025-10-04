import { auth, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

import { CreateNewDataSheetButton } from "@/components/CreateNewDataSheetButton";
import { getDataSheetsWithResponseCounts } from "@/lib/data/dataSheets";

export default async function Dashboard() {
	const { userId } = await auth();
	if (!userId) {
		return <div>Please log in to choose a plan.</div>;
	}

	const client = await clerkClient();
	const user = await client.users.getUser(userId);
	const currentPlan = user.publicMetadata.plan as string;

	// TODO: Get companyId from user
	const companyId = null as string | null;
	const dataSheets = await getDataSheetsWithResponseCounts();

	return (
		<div>
			<h1>Hello, {user.firstName}!</h1>
			<p>Your current plan is {currentPlan ?? "free"}</p>
			<CreateNewDataSheetButton companyId={companyId} userId={userId} />

			<section>
				<h2>Your Data Sheets</h2>
				<ul>
					{dataSheets.map((dataSheet) => (
						<li className="flex flex-row gap-2" key={dataSheet.id}>
							<div className="flex-1">
								{dataSheet.name}
								<div className="text-gray-400 text-xs">
									Responses: {dataSheet.responseCounts.total}
									{dataSheet.responseCounts.unread > 0 && (
										<span className="ml-1 text-blue-600">
											({dataSheet.responseCounts.unread} unread)
										</span>
									)}
									{dataSheet.responseCounts.archived > 0 && (
										<span className="ml-1 text-gray-500">
											({dataSheet.responseCounts.archived} archived)
										</span>
									)}
								</div>
							</div>
							<Link
								className="text-gray-500 text-sm"
								href={`/editor/${dataSheet.id}`}
							>
								Edit
							</Link>
							<Link
								className="text-gray-500 text-sm"
								href={`/view/${dataSheet.id}`}
							>
								View
							</Link>
							<Link
								className="text-gray-500 text-sm"
								href={`/dashboard/${dataSheet.id}`}
							>
								Leads
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
