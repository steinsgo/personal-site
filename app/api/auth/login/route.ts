// app/api/auth/login/route.ts
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createSession, setSessionCookie } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const loginSchema = z.object({
  // 这里字段名叫 login，对应前端 JSON 的 { login: uu, password: pp }
  login: z
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
  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: issue?.message ?? "参数错误" },
      { status: 400 },
    );
  }

  const { login, password } = parsed.data;

  // 这里只按 username 登录，后面你想扩展 email 再说
  const user = await prisma.user.findUnique({
    where: { username: login },
  });

  if (!user) {
    // 关键：用户不存在 → 404，让前端走“自动注册”分支
    return NextResponse.json(
      { error: "用户不存在" },
      { status: 404 },
    );
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    // 用户存在、密码错 → 401，不注册
    return NextResponse.json(
      { error: "密码不正确" },
      { status: 401 },
    );
  }

  const { sessionId, expiresAt } = await createSession(user.id, req);
  const res = NextResponse.json(
    {
      mode: "login",
      user: { id: user.id, username: user.username },
    },
    { status: 200 },
  );
  setSessionCookie(res, sessionId, expiresAt);
  return res;
}
