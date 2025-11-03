import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db";

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
  }
}

const PUBLIC_ID_PREFIX = "mochi";

async function generateUniquePublicId() {
  // Try a few times to avoid collisions; SQLite constraints will still protect us.
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const candidate = `${PUBLIC_ID_PREFIX}-${randomBytes(4).toString("hex")}`;

    const existing = await prisma.guestbookUser.findUnique({
      where: { publicId: candidate },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }
  }

  // As a fallback, let the database uniqueness constraint handle rare duplicates.
  return `${PUBLIC_ID_PREFIX}-${randomBytes(6).toString("hex")}`;
}

export async function resolveGuestbookUser(nickname: string, password: string) {
  const trimmedNickname = nickname.trim();
  const trimmedPassword = password.trim();

  if (!trimmedNickname || !trimmedPassword) {
    throw new InvalidCredentialsError();
  }

  const existing = await prisma.guestbookUser.findUnique({
    where: { nickname: trimmedNickname },
  });

  if (existing) {
    const valid = await bcrypt.compare(trimmedPassword, existing.passwordHash);
    if (!valid) {
      throw new InvalidCredentialsError();
    }
    return existing;
  }

  const passwordHash = await bcrypt.hash(trimmedPassword, 12);
  const publicId = await generateUniquePublicId();

  return prisma.guestbookUser.create({
    data: {
      nickname: trimmedNickname,
      passwordHash,
      publicId,
    },
  });
}
