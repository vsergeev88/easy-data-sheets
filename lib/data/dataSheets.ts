import { getUserId } from "../utils/user";
import { sql } from "../utils/sql";


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

