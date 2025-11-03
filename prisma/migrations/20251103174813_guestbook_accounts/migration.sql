-- CreateTable
CREATE TABLE "GuestbookUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GuestbookEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    CONSTRAINT "GuestbookEntry_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "GuestbookUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GuestbookEntry" ("createdAt", "id", "message", "name") SELECT "createdAt", "id", "message", "name" FROM "GuestbookEntry";
DROP TABLE "GuestbookEntry";
ALTER TABLE "new_GuestbookEntry" RENAME TO "GuestbookEntry";
CREATE INDEX "GuestbookEntry_authorId_idx" ON "GuestbookEntry"("authorId");
CREATE TABLE "new_GuestbookReply" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    CONSTRAINT "GuestbookReply_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "GuestbookEntry" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "GuestbookReply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "GuestbookUser" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GuestbookReply" ("createdAt", "entryId", "id", "message", "name") SELECT "createdAt", "entryId", "id", "message", "name" FROM "GuestbookReply";
DROP TABLE "GuestbookReply";
ALTER TABLE "new_GuestbookReply" RENAME TO "GuestbookReply";
CREATE INDEX "GuestbookReply_authorId_idx" ON "GuestbookReply"("authorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GuestbookUser_nickname_key" ON "GuestbookUser"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "GuestbookUser_publicId_key" ON "GuestbookUser"("publicId");
