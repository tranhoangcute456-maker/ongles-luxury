import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    if (password === adminPassword) {
      const session = await getSession();
      session.isAdmin = true;
      await session.save();
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Sai mật khẩu" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
