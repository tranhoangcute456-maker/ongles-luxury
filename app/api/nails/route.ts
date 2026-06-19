import { NextResponse } from "next/server";
import { initNailsJson, readNails } from "@/lib/nails";

export async function GET() {
  try {
    initNailsJson();
    return NextResponse.json(readNails());
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
