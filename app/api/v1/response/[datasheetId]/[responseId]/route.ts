import { NextResponse } from "next/server";

import {
  deleteResponse,
  getResponseById,
  updateResponse,
} from "@/lib/data/datasheetResponses";

type Params = {
  datasheetId: string;
  responseId: string;
};

export async function GET(_: Request, { params }: { params: Promise<Params> }) {
  const { responseId } = await params;
  if (!responseId) {
    return NextResponse.json(
      { error: "responseId is required" },
      { status: 400 }
    );
  }
  const response = await getResponseById(responseId);
  return NextResponse.json({ response });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  const { responseId } = await params;
  const { response } = await request.json();
  if (!responseId) {
    return NextResponse.json(
      { error: "responseId is required" },
      { status: 400 }
    );
  }
  const updatedResponse = await updateResponse(response);
  return NextResponse.json({ response: updatedResponse });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<Params> }
) {
  const { responseId } = await params;
  if (!responseId) {
    return NextResponse.json(
      { error: "responseId is required" },
      { status: 400 }
    );
  }
  await deleteResponse(responseId);
  return NextResponse.json({ success: true });
}
