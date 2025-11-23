// lib/auth.ts
import { prisma } from "@/lib/db";
import { createHash, randomBytes } from "crypto";
import type { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "gb_session";
const SESSION_TTL_DAYS = 30;

function hashIp(ip: string | null | undefined) {
  if (!ip) return null;
  return createHash("sha256").update(ip).digest("hex");
}

// 在数据库中新建一条 Session 记录
export async function createSession(userId: string, req: NextRequest) {
  const id = randomBytes(32).toString("hex");
  const expiresAt = new Date(
    Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
  );

  const ua = req.headers.get("user-agent") ?? undefined;
  const ipHeader = req.headers.get("x-forwarded-for");
  const ip = ipHeader?.split(",")[0]?.trim() ?? null;

  await prisma.session.create({
    data: {
      id,
      userId,
      expiresAt,
      userAgent: ua,
      ipHash: hashIp(ip),
    },
  });

  return { sessionId: id, expiresAt };
}

// 在响应里写入 Cookie
export function setSessionCookie(
  res: NextResponse,
  sessionId: string,
  expiresAt: Date,
) {
  res.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

// 清除 Cookie（退出登录时用）
export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

// 从当前请求中解析 Session → User
export async function getCurrentUser(req: NextRequest) {
  const sessionId = req.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt <= new Date()) return null;

  return session.user;
}
