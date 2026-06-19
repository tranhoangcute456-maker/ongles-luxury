import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { addNail, getNailDir } from "@/lib/nails";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const category = (formData.get("category") as string) || "nailart";
    const title    = (formData.get("title")    as string) || "Nail Art";
    const tagsRaw  = (formData.get("tags")     as string) || "[]";
    const files    = formData.getAll("images") as File[];

    if (!files || files.length === 0)
      return NextResponse.json({ error: "No files provided" }, { status: 400 });

    let tags: string[] = [];
    try { tags = JSON.parse(tagsRaw); } catch { tags = []; }

    const sharp   = (await import("sharp")).default;
    const nailDir = getNailDir();
    const results = [];

    for (const file of files) {
      if (!["image/jpeg","image/jpg","image/png","image/webp"].includes(file.type))
        return NextResponse.json({ error: `${file.name}: invalid format` }, { status: 400 });
      if (file.size > 5 * 1024 * 1024)
        return NextResponse.json({ error: `${file.name}: exceeds 5MB` }, { status: 400 });

      const buf      = Buffer.from(await file.arrayBuffer());
      const ts       = Date.now();
      const rand     = Math.random().toString(36).substring(2, 8);
      const filename = `nail_${ts}_${rand}.webp`;

      await sharp(buf)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(path.join(nailDir, filename));

      const entry = { filename, title, category, tags, uploadedAt: new Date().toISOString() };
      addNail(entry);
      results.push(entry);
    }

    return NextResponse.json({ success: true, nails: results });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
