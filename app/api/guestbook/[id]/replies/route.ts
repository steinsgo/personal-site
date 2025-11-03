import { NextResponse } from "next/server";
import { z } from "zod";

import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import { InvalidCredentialsError, resolveGuestbookUser } from "@/lib/guestbook-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const replySchema = z.object({
  message: z.string().trim().min(1).max(500),
  nickname: z.string().trim().min(1).max(50).optional(),
  password: z.string().min(4).max(100).optional(),
  anonymous: z.boolean().optional(),
  anonymousName: z.string().trim().min(1).max(60).optional(),
});

type GuestbookReplyWithAuthor = Prisma.GuestbookReplyGetPayload<{
  include: {
    author: { select: { publicId: true; nickname: true } };
  };
}>;

function mapReply(reply: GuestbookReplyWithAuthor) {
  return {
    id: reply.id,
    name: reply.name,
    message: reply.message,
    createdAt: reply.createdAt,
    isAnonymous: reply.isAnonymous,
    authorPublicId: reply.author ? reply.author.publicId : null,
  };
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  const replies = await prisma.guestbookReply.findMany({
    where: { entryId: id },
    orderBy: { createdAt: "asc" },
    take: 10,
    include: {
      author: {
        select: {
          publicId: true,
          nickname: true,
        },
      },
    },
  });

  return NextResponse.json(replies.map(mapReply));
}

export async function POST(
  request: Request,
  context: RouteContext,
) {
  const { id: entryId } = await context.params;

  if (!entryId) {
    return NextResponse.json({ error: "Missing entry id." }, { status: 400 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = replySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { nickname, password, message, anonymous, anonymousName } = parsed.data;
  const isAnonymous = anonymous ?? false;

  const entryExists = await prisma.guestbookEntry.findUnique({
    where: { id: entryId },
    select: { id: true },
  });

  if (!entryExists) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  let resolvedName = anonymousName?.trim() || "Secret Mochi";
  let authorId: string | null = null;

  if (!isAnonymous) {
    if (!nickname || !password) {
      return NextResponse.json(
        { error: "Nickname and password are required." },
        { status: 400 },
      );
    }

    try {
      const user = await resolveGuestbookUser(nickname, password);
      resolvedName = user.nickname;
      authorId = user.id;
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return NextResponse.json({ error: "Wrong password." }, { status: 401 });
      }
      console.error("Failed to resolve guestbook user:", error);
      return NextResponse.json({ error: "Failed to post reply." }, { status: 500 });
    }
  }

  const created = await prisma.guestbookReply.create({
    data: {
      entryId,
      name: resolvedName,
      message,
      authorId,
      isAnonymous,
    },
    include: {
      author: {
        select: {
          publicId: true,
          nickname: true,
        },
      },
    },
  });

  return NextResponse.json(mapReply(created), { status: 201 });
}
