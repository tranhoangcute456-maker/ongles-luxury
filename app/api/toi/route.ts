import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const toiDir = path.join(process.cwd(), "public", "images", "toi");
    if (!fs.existsSync(toiDir)) return NextResponse.json({ images: [] });
    const images = fs
      .readdirSync(toiDir)
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
    return NextResponse.json({ images });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
