import { clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import PlanButtons from '@/components/PlanButtons'

async function updateUserPlan(plan: string) {
  "use server"
  // We need to get the user ID on the server side within the action
  const { userId } = await auth()
  if (!userId) {
    throw new Error("User not authenticated")
  }

  try {
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        plan: plan,
      },
    })
    console.log(`User ${userId} plan updated to ${plan}`)
    // Revalidate the path if needed to reflect changes immediately
    // e.g., if another part of the UI depends on this metadata
    revalidatePath("/plan")
  } catch (error) {
    console.error("Failed to update user plan:", error)
    // Handle error appropriately, maybe return an error message
    throw new Error("Failed to update plan")
  }
}

export default async function Plan() {
  const { userId } = await auth()
  if (!userId) {
    return <div>Please log in to choose a plan.</div>
  }

  // Fetch the full user object on the server
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const currentPlan = (user.publicMetadata?.plan as string) || null; // Get current plan

  return (
    <div>
      <h1>Choose User Plan</h1>
      <p>Current plan: {currentPlan || 'None'}</p> {/* Display current plan */}
      {/* Render the Client Component, passing the Server Action and current plan */}
      <PlanButtons updateUserPlan={updateUserPlan} currentPlan={currentPlan} />
    </div>
  )
}