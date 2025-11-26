import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  if (!roomId) return NextResponse.json({ error: "missing roomId" }, { status: 400 });

  const msgs = await prisma.chatMessage.findMany({
    where: { roomId },
    orderBy: { createdAt: "asc" },
    take: 100,
    include: { user: { select: { username: true } } },
  });

  return NextResponse.json(
    msgs.map((m) => ({
      id: m.id,
      roomId: m.roomId,
      kind: m.kind,
      text: m.text,
      imageUrl: m.imageUrl,
      createdAt: m.createdAt,
      user: { username: m.user.username },
    })),
  );
}

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as
    | { roomId?: string; kind?: "text" | "image"; text?: string; imageUrl?: string }
    | null;

  const roomId = (body?.roomId ?? "").trim();
  const kind = (body?.kind ?? "text").trim();
  const text = (body?.text ?? "").trim();
  const imageUrl = (body?.imageUrl ?? "").trim();

  if (!roomId) return NextResponse.json({ error: "missing roomId" }, { status: 400 });

if (kind === "image") {
  const ok =
    /^https?:\/\/.+/i.test(imageUrl) || imageUrl.startsWith("/uploads/");
  if (!ok) {
    return NextResponse.json(
      { error: "imageUrl must be http(s) url or /uploads/..." },
      { status: 400 },
    );
  }
}
else {
    if (text.length < 1 || text.length > 500) {
      return NextResponse.json({ error: "text must be 1–500 chars" }, { status: 400 });
    }
  }

  const msg = await prisma.chatMessage.create({
    data: {
      roomId,
      userId: me.id,
      kind,
      text: kind === "text" ? text : null,
      imageUrl: kind === "image" ? imageUrl : null,
    },
    include: { user: { select: { username: true } } },
  });

  return NextResponse.json({
    id: msg.id,
    roomId: msg.roomId,
    kind: msg.kind,
    text: msg.text,
    imageUrl: msg.imageUrl,
    createdAt: msg.createdAt,
    user: { username: msg.user.username },
  }, { status: 201 });
}
