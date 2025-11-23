// app/api/auth/register/route.ts
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createSession, setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "用户名长度需在 3~24 之间")
    .max(24, "用户名长度需在 3~24 之间"),
  password: z
    .string()
    .min(8, "密码至少 8 位")
    .max(72, "密码太长了"),
});

export async function POST(req: NextRequest) {
  const raw = await req.json().catch(() => null);
  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: issue?.message ?? "参数错误" },
      { status: 400 },
    );
  }

  const { username, password } = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { username },
  });

  if (existing) {
    return NextResponse.json(
      { error: "这个用户名已经被使用了" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
  });

  const { sessionId, expiresAt } = await createSession(user.id, req);
  const res = NextResponse.json(
    {
      mode: "register",
      user: { id: user.id, username: user.username },
    },
    { status: 201 },
  );
  setSessionCookie(res, sessionId, expiresAt);
  return res;
}
