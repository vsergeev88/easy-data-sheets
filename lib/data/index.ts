import { neon } from '@neondatabase/serverless';
import { getUserId } from '../utils';

const sql = neon(`${process.env.DATABASE_URL}`);

// Define a type for the comment for better type safety
export type Comment = {
  comment: string;
};

/**
 * @deprecated
 */
export async function getComments(): Promise<Comment[]> {
  'use server';
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
  if (!commentText || typeof commentText !== 'string' || commentText.trim().length === 0) {
    throw new Error('Invalid comment text');
  }
  // Insert the comment into the database
  await sql`INSERT INTO comments (comment) VALUES (${commentText.trim()})`;
}

export type DataSheet = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  data: string;
  published: boolean;
}

export async function createDataSheet(name: string, data?: Record<string, unknown>): Promise<DataSheet> {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const updatedAt = new Date();
  const dataString = data ? JSON.stringify(data) : '';

  const userId = await getUserId();


  await sql`INSERT INTO data_sheets (id, name, data, created_at, updated_at, user_id, published) VALUES (${id}, ${name}, ${dataString}, ${createdAt}, ${updatedAt}, ${userId}, false)`;

  // Construct the DataSheet object to return
  const newDataSheet: DataSheet = {
    id,
    name,
    createdAt,
    updatedAt,
    userId,
    published: false,
    data: dataString
  };

  return newDataSheet;
}

export async function getDataSheets(): Promise<DataSheet[]> {
  const userId = await getUserId();
  const dataSheets = await sql`SELECT * FROM data_sheets WHERE user_id = ${userId}`;
  return dataSheets as DataSheet[];
}

export async function getDataSheet(dataSheetId: string): Promise<DataSheet> {
  const [dataSheet] = await sql`SELECT * FROM data_sheets WHERE id = ${dataSheetId}`;
  return dataSheet as DataSheet;
}


