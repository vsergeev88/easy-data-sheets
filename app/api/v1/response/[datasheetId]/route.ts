import { NextResponse } from "next/server";

import { getResponsesByDatasheetId } from "@/lib/data/datasheetResponses";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ datasheetId: string }> }
) {
  const { datasheetId } = await params;
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit");
  const offset = url.searchParams.get("offset");
  const archived = url.searchParams.get("archived");
  if (!datasheetId) {
    return NextResponse.json(
      { error: "datasheetId is required" },
      { status: 400 }
    );
  }
  const response = await getResponsesByDatasheetId(
    datasheetId,
    limit ? Number(limit) : 100,
    offset ? Number(offset) : 0,
    archived ? archived === "true" : false
  );
  return NextResponse.json({ response });
}
