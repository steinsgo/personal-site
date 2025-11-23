// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE, clearSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE);
  const sessionId = cookie?.value;

  if (sessionId) {
    await prisma.session.deleteMany({ where: { id: sessionId } });
  }

  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  return res;
}
