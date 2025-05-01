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

  return <div>
    <h1>Hello, {user.firstName}!</h1>
    <p>Your current plan is {currentPlan ?? "free"}</p>
    <Link href="/editor" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">Create new Data Sheet</Link>

    <section>
      <h2>Your Data Sheets</h2>
      <ul>
        <li>
          <Link href="/dashboard/data-sheet-1">Data Sheet 1</Link>
        </li>

      </ul>
    </section>
  </div>
}