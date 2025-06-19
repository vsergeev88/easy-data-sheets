import { sql } from "../utils";
export * from "./dataSheets";

// Define a type for the comment for better type safety
export type Comment = {
	comment: string;
};

/**
 * @deprecated
 */
export async function getComments(): Promise<Comment[]> {
	"use server";
	// Fetch comments from the database
	// Ensure selected columns match the Comment type
	const comments = await sql`SELECT comment FROM comments`;
	// Assuming the neon driver correctly maps column names to the Comment type fields
	return comments as Comment[]; // Add type assertion if necessary
}

/**
 * @deprecated
 */
export async function createComment(commentText: string): Promise<void> {
	// Validate comment text (basic example)
	if (
		!commentText ||
		typeof commentText !== "string" ||
		commentText.trim().length === 0
	) {
		throw new Error("Invalid comment text");
	}
	// Insert the comment into the database
	await sql`INSERT INTO comments (comment) VALUES (${commentText.trim()})`;
}
