import { NextResponse } from "next/server";
import { z } from "zod";

import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import { InvalidCredentialsError, resolveGuestbookUser } from "@/lib/guestbook-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const entrySchema = z.object({
  message: z.string().trim().min(1).max(500),
  nickname: z.string().trim().min(1).max(50).optional(),
  password: z.string().min(4).max(100).optional(),
  anonymous: z.boolean().optional(),
  anonymousName: z.string().trim().min(1).max(60).optional(),
});

type GuestbookEntryWithRelations = Prisma.GuestbookEntryGetPayload<{
  include: {
    author: { select: { publicId: true; nickname: true } };
    replies: {
      include: {
        author: { select: { publicId: true; nickname: true } };
      };
    };
  };
}>;

type GuestbookReplyWithAuthor = GuestbookEntryWithRelations["replies"][number];

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

function mapEntry(entry: GuestbookEntryWithRelations) {
  return {
    id: entry.id,
    name: entry.name,
    message: entry.message,
    createdAt: entry.createdAt,
    isAnonymous: entry.isAnonymous,
    authorPublicId: entry.author ? entry.author.publicId : null,
    replies: entry.replies.map(mapReply),
  };
}

export async function GET() {
  const entries = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      author: {
        select: {
          publicId: true,
          nickname: true,
        },
      },
      replies: {
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
      },
    },
  });

  return NextResponse.json(entries.map(mapEntry));
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = entrySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { message, nickname, password, anonymous, anonymousName } = parsed.data;
  const isAnonymous = anonymous ?? false;

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
      return NextResponse.json({ error: "Failed to post entry." }, { status: 500 });
    }
  }

  const created = await prisma.guestbookEntry.create({
    data: {
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
      replies: {
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
      },
    },
  });

  return NextResponse.json(mapEntry(created), { status: 201 });
}
