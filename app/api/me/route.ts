// app/api/me/route.ts
import { getCurrentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req);

  if (!user) {
    // 前端期待的形状：{ id: null }
    return NextResponse.json({ id: null }, { status: 200 });
  }

  return NextResponse.json(
    { id: user.id, username: user.username },
    { status: 200 },
  );
}
