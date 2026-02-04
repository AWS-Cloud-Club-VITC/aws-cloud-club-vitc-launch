import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: "Recruitments are currently closed." },
    { status: 403 }
  );
}

