import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteNail, updateNail } from "@/lib/nails";

interface Params { params: Promise<{ filename: string }>; }

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { filename } = await params;
  deleteNail(decodeURIComponent(filename));
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await getSession();
  if (!session.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { filename } = await params;
  const body = await req.json();
  updateNail(decodeURIComponent(filename), {
    title:    body.title,
    category: body.category,
    tags:     body.tags,
  });
  return NextResponse.json({ success: true });
}
