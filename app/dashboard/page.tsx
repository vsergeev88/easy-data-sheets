import { CreateNewDataSheetButton } from "@/components/CreateNewDataSheetButton";
import { getDataSheets } from "@/lib/data/dataSheets";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Dashboard() {
  const { userId } = await auth()
  if (!userId) {
    return <div>Please log in to choose a plan.</div>
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const currentPlan = user.publicMetadata.plan as string

  // TODO: Get companyId from user
  const companyId = null
  const dataSheets = await getDataSheets()

  return <div>
    <h1>Hello, {user.firstName}!</h1>
    <p>Your current plan is {currentPlan ?? "free"}</p>
    <CreateNewDataSheetButton userId={userId} companyId={companyId} />

    <section>
      <h2>Your Data Sheets</h2>
      <ul>
        {dataSheets.map((dataSheet) => (
          <li key={dataSheet.id} className="flex flex-row gap-2">
            {dataSheet.name}
            <Link className="text-sm text-gray-500" href={`/editor/${dataSheet.id}`}>Edit</Link>
            <Link className="text-sm text-gray-500" href={`/view/${dataSheet.id}`}>View</Link>
            <Link className="text-sm text-gray-500" href={`/dashboard/${dataSheet.id}`}>Leads</Link>
          </li>
        ))}
      </ul>
    </section>
  </div>
}