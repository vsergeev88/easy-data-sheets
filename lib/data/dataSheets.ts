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

export async function createDataSheet(
  name: string,
  data?: Record<string, unknown>,
  companyId?: string
): Promise<DataSheet> {
  const id = crypto.randomUUID();
  const createdAt = new Date();
  const updatedAt = new Date();
  const dataString = data ? JSON.stringify(data) : "";

  const userId = await getUserId();

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

export async function deleteDataSheet(dataSheetId: string): Promise<void> {
  const userId = await getUserId();
  await sql`DELETE FROM data_sheets WHERE id = ${dataSheetId} AND user_id = ${userId}`;
}
