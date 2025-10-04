import { sql } from "../utils/sql";
import { getUserId } from "../utils/user";
import { supportLegacyDataSheet } from "./supportLegacyData";

export type DataSheet = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  data: string;
  published: boolean;
  companyId: string | null;
};

export type DataSheetWithResponseCounts = DataSheet & {
  responseCounts: {
    total: number;
    unread: number;
    archived: number;
  };
};

export async function createDataSheet(
  name: string,
  data?: Record<string, unknown>,
  companyId?: string
): Promise<DataSheet> {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const updatedAt = new Date();
  const dataString = data ? JSON.stringify(data) : "";

  console.log("===> data", data);
  console.log("===> dataString", dataString);

  const userId = await getUserId();

  if (!userId) {
    throw new Error("User ID is required");
  }

  await sql`INSERT INTO data_sheets (id, name, data, created_at, updated_at, user_id, published, company_id) VALUES (${id}, ${name}, ${dataString}, ${createdAt}, ${updatedAt}, ${userId}, false, ${companyId ?? null})`;

  // Construct the DataSheet object to return
  const newDataSheet: DataSheet = {
    id,
    name,
    createdAt,
    updatedAt,
    userId,
    published: false,
    companyId: companyId ?? null,
    data: dataString,
  };

  return newDataSheet;
}

export async function getDataSheets(): Promise<DataSheet[]> {
  const userId = await getUserId();
  const dataSheets =
    await sql`SELECT * FROM data_sheets WHERE user_id = ${userId} ORDER BY updated_at DESC`;
  return dataSheets as DataSheet[];
}

export async function getDataSheet(dataSheetId: string): Promise<DataSheet> {
  const [dataSheet] =
    await sql`SELECT * FROM data_sheets WHERE id = ${dataSheetId}`;
  const dataSheetFormatted: DataSheet = {
    id: dataSheet.id,
    name: dataSheet.name,
    createdAt: new Date(dataSheet.created_at),
    updatedAt: new Date(dataSheet.updated_at),
    userId: dataSheet.user_id,
    published: dataSheet.published,
    companyId: dataSheet.company_id,
    data: dataSheet.data,
  };
  return supportLegacyDataSheet(dataSheetFormatted) as DataSheet;
}

export async function updateDataSheet(
  dataSheet: DataSheet
): Promise<DataSheet> {
  const userId = await getUserId();
  await sql`UPDATE data_sheets SET name = ${dataSheet.name}, data = ${dataSheet.data}, updated_at = ${dataSheet.updatedAt}, published = ${dataSheet.published} WHERE id = ${dataSheet.id} AND user_id = ${userId}`;
  return dataSheet;
}

type DataSheetQueryResult = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  published: boolean;
  company_id: string | null;
  data: string;
  total_responses: number;
  unread_responses: number;
  archived_responses: number;
};

export async function getDataSheetsWithResponseCounts(): Promise<
  DataSheetWithResponseCounts[]
> {
  const userId = await getUserId();

  const results = await sql`
    SELECT 
      ds.*,
      COALESCE(dr.total_responses, 0) as total_responses,
      COALESCE(dr.unread_responses, 0) as unread_responses,
      COALESCE(dr.archived_responses, 0) as archived_responses
    FROM data_sheets ds
    LEFT JOIN (
      SELECT 
        datasheet_id,
        COUNT(*) as total_responses,
        COUNT(*) FILTER (WHERE unread = true) as unread_responses,
        COUNT(*) FILTER (WHERE archived = true) as archived_responses
      FROM datasheet_responses
      GROUP BY datasheet_id
    ) dr ON ds.id = dr.datasheet_id
    WHERE ds.user_id = ${userId}
    ORDER BY ds.updated_at DESC
  `;

  return (results as DataSheetQueryResult[]).map((row) => ({
    id: row.id,
    name: row.name,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    userId: row.user_id,
    published: row.published,
    companyId: row.company_id,
    data: row.data,
    responseCounts: {
      total: Number(row.total_responses),
      unread: Number(row.unread_responses),
      archived: Number(row.archived_responses),
    },
  }));
}

export async function deleteDataSheet(dataSheetId: string): Promise<void> {
  const userId = await getUserId();
  await sql`DELETE FROM data_sheets WHERE id = ${dataSheetId} AND user_id = ${userId}`;
}
