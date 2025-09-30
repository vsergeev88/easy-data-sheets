import { NextResponse } from "next/server";

import { getResponsesCountByDatasheetId } from "@/lib/data/datasheetResponses";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ datasheetId: string }> }
) {
  try {
    const { datasheetId } = await params;
    const counts = await getResponsesCountByDatasheetId(datasheetId);

    return NextResponse.json(counts);
  } catch {
    return NextResponse.json(
      { error: "Failed to get response counts" },
      { status: 500 }
    );
  }
}
