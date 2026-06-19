import { NextResponse } from "next/server";
import { initNailsJson, readFeatured } from "@/lib/nails";

export async function GET() {
  try {
    initNailsJson();
    return NextResponse.json(readFeatured(8));
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
