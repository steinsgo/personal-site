// app/api/guestbook/route.ts
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 读取留言列表（不需要登录）
export async function GET() {
  const rows = await prisma.guestbookEntry.findMany({
    where: { status: "active", deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const data = rows.map((e) => ({
    id: e.id,
    name: e.displayName,
    message: e.message,
    createdAt: e.createdAt.toISOString(),
    isAnonymous: e.authorType === "anonymous",
    authorPublicId: null as string | null,
    replies: [] as any[], // 暂时不做回复，避免前端崩
  }));

  return NextResponse.json(data);
}

// 发布新留言（必须登录）
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const raw = String(body?.message ?? "").trim();
    const anonymous = Boolean(body?.anonymous);

    if (!raw || raw.length > 500) {
      return NextResponse.json(
        { error: "留言长度需在 1~500 之间" },
        { status: 400 },
      );
    }

    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "未登录，请先在右上角登录" },
        { status: 401 },
      );
    }

    const authorType = anonymous ? "anonymous" : "user";
    const displayName = anonymous ? "匿名访客" : user.username;

    const created = await prisma.guestbookEntry.create({
      data: {
        userId: user.id,
        authorType,
        displayName,
        message: raw,
        status: "active",
      },
    });

    const payload = {
      id: created.id,
      name: displayName,
      message: created.message,
      createdAt: created.createdAt.toISOString(),
      isAnonymous: anonymous,
      authorPublicId: null as string | null,
      replies: [] as any[],
    };

    return NextResponse.json(payload, { status: 201 });
  } catch (err) {
    console.error("GUESTBOOK POST error", err);
    return NextResponse.json(
      { error: "服务器错误，请稍后再试" },
      { status: 500 },
    );
  }
}
