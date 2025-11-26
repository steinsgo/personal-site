import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rooms = await prisma.chatRoom.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      _count: { select: { messages: true } },
      messages: { take: 1, orderBy: { createdAt: "desc" }, select: { text: true, kind: true, createdAt: true } },
      createdBy: { select: { username: true } },
    },
  });

  return NextResponse.json(
    rooms.map((r) => ({
      id: r.id,
      name: r.name,
      tag: r.tag,
      isPublic: r.isPublic,
      createdAt: r.createdAt,
      createdBy: r.createdBy.username,
      messageCount: r._count.messages,
      last: r.messages[0] ?? null,
    })),
  );
}

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { name?: string; tag?: string; isPublic?: boolean } | null;
  const name = (body?.name ?? "").trim();
  const tag = (body?.tag ?? "").trim() || null;
  const isPublic = body?.isPublic ?? true;

  if (name.length < 2 || name.length > 40) {
    return NextResponse.json({ error: "Room name must be 2–40 chars." }, { status: 400 });
  }

  const room = await prisma.chatRoom.create({
    data: { name, tag, isPublic, createdById: me.id },
    select: { id: true, name: true, tag: true, isPublic: true, createdAt: true },
  });

  return NextResponse.json(room, { status: 201 });
}
