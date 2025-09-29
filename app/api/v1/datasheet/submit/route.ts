import { NextResponse } from "next/server";

import { createResponse } from "@/lib/data/datasheetResponses";

export async function POST(request: Request) {
  const { newResponse } = await request.json();
  if (!newResponse) {
    return NextResponse.json(
      { error: "DataSheet is required" },
      { status: 400 }
    );
  }

  const response = await createResponse(newResponse);
  return NextResponse.json({ response });
}
