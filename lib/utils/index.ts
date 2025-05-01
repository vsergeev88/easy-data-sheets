import { auth } from "@clerk/nextjs/server";
export { sql } from "./sql";
export async function getUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('User not found');
  }
  return userId;
}
