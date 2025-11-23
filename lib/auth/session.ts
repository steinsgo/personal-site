import bcrypt from "bcryptjs";
import crypto from "node:crypto";

import { prisma } from "@/lib/db";

export const SESSION_COOKIE_NAME = "sid";
const SESSION_DAYS = 14;

// —— 密码工具 —— //
export async function hashPassword(password: string) {
  // 生产环境可以把 rounds 调高一点
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(hash: string, password: string) {
  return bcrypt.compare(password, hash);
}

// —— Session 工具，只管数据库，不直接操作 Cookie —— //
export async function createSessionRecord(userId: string) {
  const id = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400_000);

  await prisma.session.create({
    data: { id, userId, expiresAt },
  });

  return { id, expiresAt };
}

export async function deleteSessionById(id: string) {
  await prisma.session.deleteMany({ where: { id } });
}

export async function getUserForSessionId(id: string) {
  const now = new Date();
  const session = await prisma.session.findFirst({
    where: {
      id,
      expiresAt: { gt: now },
    },
    include: {
      user: true,
    },
  });
  return session?.user ?? null;
}
