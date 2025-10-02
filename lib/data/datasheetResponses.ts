import { sql } from "../utils/sql";
import { getUserId } from "../utils/user";

export type DataSheetResponse = {
  id: string;
  datasheetName: string;
  contacts: string | null;
  datasheetId: string;
  createdAt: Date;
  updatedAt: Date;
  data: string;
  authorId: string;
  userId: string | null;
  companyId: string | null;
  demo: boolean;
  bookmarked: boolean;
  notes: string;
  archived: boolean;
  unread: boolean;
};

export type DataSheetResponseDB = {
  id: string;
  datasheet_name: string;
  contacts: string | null;
  datasheet_id: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  user_id: string | null;
  company_id: string | null;
  demo: boolean;
  data: string;
  bookmarked: boolean;
  notes: string;
  archived: boolean;
  unread: boolean;
};

export type CountResult = {
  count: number;
};

export type CreateResponse = Pick<
  DataSheetResponse,
  | "datasheetName"
  | "contacts"
  | "datasheetId"
  | "authorId"
  | "companyId"
  | "demo"
  | "data"
>;

export type ResponsesData = {
  responses: DataSheetResponse[];
  total: number;
};

export async function getResponsesByDatasheetId(
  datasheetId: string,
  limit: number,
  offset: number,
  archived: boolean
): Promise<ResponsesData> {
  const responsesQuery =
    (await sql`SELECT * FROM datasheet_responses WHERE datasheet_id = ${datasheetId} AND archived = ${archived} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`) as DataSheetResponseDB[];

  const responses: DataSheetResponse[] = responsesQuery.map((response) => ({
    id: response.id,
    datasheetName: response.datasheet_name,
    contacts: response.contacts,
    datasheetId: response.datasheet_id,
    createdAt: new Date(response.created_at),
    updatedAt: new Date(response.updated_at),
    userId: response.user_id,
    authorId: response.author_id,
    companyId: response.company_id,
    demo: response.demo,
    data: response.data,
    bookmarked: response.bookmarked,
    notes: response.notes,
    archived: response.archived,
    unread: response.unread,
  }));

  const totalResult =
    (await sql`SELECT COUNT(*) as count FROM datasheet_responses WHERE datasheet_id = ${datasheetId} AND archived = ${archived}`) as CountResult[];
  const total = totalResult[0]?.count || 0;
  return { responses, total };
}

export async function getResponseById(id: string): Promise<DataSheetResponse> {
  const response =
    await sql`SELECT * FROM datasheet_responses WHERE id = ${id}`;
  return response as unknown as DataSheetResponse;
}

export async function getResponsesByAuthorId(
  authorId: string,
  limit: number,
  offset: number,
  archived: boolean
): Promise<{ responses: DataSheetResponse[]; total: number }> {
  const responses =
    (await sql`SELECT * FROM datasheet_responses WHERE author_id = ${authorId} AND archived = ${archived} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`) as DataSheetResponse[];
  const totalResult =
    (await sql`SELECT COUNT(*) as count FROM datasheet_responses WHERE author_id = ${authorId} AND archived = ${archived}`) as CountResult[];
  const total = totalResult[0]?.count || 0;
  return { responses, total };
}

export async function createResponse(
  response: CreateResponse
): Promise<DataSheetResponse> {
  if (!(response.data && response.authorId && response.datasheetId)) {
    throw new Error("Data and authorId are required");
  }

  const userId = await getUserId();

  const newResponse: DataSheetResponse = {
    id: crypto.randomUUID(),
    datasheetName: response.datasheetName ?? "",
    contacts: response.contacts ?? null,
    datasheetId: response.datasheetId,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: userId ?? null,
    authorId: response.authorId,
    companyId: response.companyId ?? null,
    demo: response.demo ?? false,
    data: response.data,
    bookmarked: false,
    notes: "",
    archived: false,
    unread: true,
  };

  await sql`INSERT INTO datasheet_responses (id, datasheet_name, contacts, datasheet_id, created_at, updated_at, user_id, author_id, company_id, demo, data, bookmarked, notes, archived, unread) VALUES (${newResponse.id}, ${newResponse.datasheetName}, ${newResponse.contacts}, ${newResponse.datasheetId}, ${newResponse.createdAt}, ${newResponse.updatedAt}, ${newResponse.userId}, ${newResponse.authorId}, ${newResponse.companyId}, ${newResponse.demo}, ${newResponse.data}, ${newResponse.bookmarked}, ${newResponse.notes}, ${newResponse.archived}, ${newResponse.unread})`;

  return newResponse;
}

export async function updateResponse(
  response: DataSheetResponse
): Promise<DataSheetResponse> {
  await sql`UPDATE datasheet_responses SET data = ${response.data}, notes = ${response.notes}, updated_at = ${new Date()} WHERE id = ${response.id}`;
  return response;
}

export async function deleteResponse(id: string): Promise<void> {
  await sql`DELETE FROM datasheet_responses WHERE id = ${id}`;
}

export async function deleteResponsesByDatasheetId(
  datasheetId: string
): Promise<void> {
  await sql`DELETE FROM datasheet_responses WHERE datasheet_id = ${datasheetId}`;
}

export async function deleteResponsesByAuthorId(
  authorId: string
): Promise<void> {
  await sql`DELETE FROM datasheet_responses WHERE author_id = ${authorId}`;
}

export async function markAsRead(id: string): Promise<void> {
  await sql`UPDATE datasheet_responses SET unread = false WHERE id = ${id}`;
}

export async function markAsUnread(id: string): Promise<void> {
  await sql`UPDATE datasheet_responses SET unread = true WHERE id = ${id}`;
}

export async function markAsArchived(id: string): Promise<void> {
  await sql`UPDATE datasheet_responses SET archived = true WHERE id = ${id}`;
}

export async function markAsUnarchived(id: string): Promise<void> {
  await sql`UPDATE datasheet_responses SET archived = false WHERE id = ${id}`;
}

export async function markAsBookmarked(id: string): Promise<void> {
  await sql`UPDATE datasheet_responses SET bookmarked = true WHERE id = ${id}`;
}

export async function markAsUnbookmarked(id: string): Promise<void> {
  await sql`UPDATE datasheet_responses SET bookmarked = false WHERE id = ${id}`;
}

export const getResponsesCountByDatasheetId = async (
  datasheetId: string
): Promise<{ total: number; unread: number; archived: number }> => {
  const count =
    await sql`SELECT COUNT(*), COUNT(*) FILTER (WHERE unread = true), COUNT(*) FILTER (WHERE archived = true) FROM datasheet_responses WHERE datasheet_id = ${datasheetId}`;
  return count as unknown as {
    total: number;
    unread: number;
    archived: number;
  };
};
