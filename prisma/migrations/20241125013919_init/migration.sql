-- CreateTable
CREATE TABLE "CatalogCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "board" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CatalogCacheThread" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "board" TEXT NOT NULL,
    "no" INTEGER NOT NULL,
    "sticky" INTEGER,
    "closed" INTEGER,
    "now" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sub" TEXT,
    "com" TEXT,
    "filename" TEXT,
    "ext" TEXT,
    "w" INTEGER,
    "h" INTEGER,
    "tn_w" INTEGER,
    "tn_h" INTEGER,
    "tim" TEXT,
    "time" INTEGER NOT NULL,
    "md5" TEXT,
    "fsize" INTEGER,
    "resto" INTEGER NOT NULL DEFAULT 0,
    "capcode" TEXT,
    "semantic_url" TEXT,
    "replies" INTEGER NOT NULL DEFAULT 0,
    "images" INTEGER NOT NULL DEFAULT 0,
    "ordinal" INTEGER NOT NULL,
    "bumplimit" INTEGER,
    "country" TEXT,
    "country_name" TEXT,
    "custom_spoiler" INTEGER,
    "filedeleted" INTEGER,
    "spoiler" INTEGER,
    "imagelimit" INTEGER,
    "trip" TEXT,
    "m_img" INTEGER,
    "since4pass" INTEGER,
    "unique_ips" INTEGER,
    "tag" TEXT,
    "catalogCacheId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CatalogCacheThread_catalogCacheId_fkey" FOREIGN KEY ("catalogCacheId") REFERENCES "CatalogCache" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ThreadCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "board" TEXT NOT NULL,
    "no" INTEGER NOT NULL,
    "sticky" INTEGER,
    "closed" INTEGER,
    "now" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sub" TEXT,
    "com" TEXT,
    "filename" TEXT,
    "ext" TEXT,
    "w" INTEGER,
    "h" INTEGER,
    "tn_w" INTEGER,
    "tn_h" INTEGER,
    "tim" TEXT,
    "time" INTEGER NOT NULL,
    "md5" TEXT,
    "fsize" INTEGER,
    "resto" INTEGER NOT NULL DEFAULT 0,
    "capcode" TEXT,
    "semantic_url" TEXT,
    "replies" INTEGER NOT NULL DEFAULT 0,
    "images" INTEGER NOT NULL DEFAULT 0,
    "bumplimit" INTEGER,
    "country" TEXT,
    "country_name" TEXT,
    "custom_spoiler" INTEGER,
    "filedeleted" INTEGER,
    "spoiler" INTEGER,
    "imagelimit" INTEGER,
    "trip" TEXT,
    "m_img" INTEGER,
    "since4pass" INTEGER,
    "unique_ips" INTEGER,
    "tag" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ThreadCacheResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "board" TEXT NOT NULL,
    "no" INTEGER NOT NULL,
    "now" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "com" TEXT,
    "filename" TEXT,
    "ext" TEXT,
    "w" INTEGER,
    "h" INTEGER,
    "tn_w" INTEGER,
    "tn_h" INTEGER,
    "tim" TEXT,
    "time" INTEGER NOT NULL,
    "md5" TEXT,
    "fsize" INTEGER,
    "resto" INTEGER NOT NULL DEFAULT 0,
    "capcode" TEXT,
    "country" TEXT,
    "country_name" TEXT,
    "custom_spoiler" INTEGER,
    "filedeleted" INTEGER,
    "spoiler" INTEGER,
    "trip" TEXT,
    "m_img" INTEGER,
    "since4pass" INTEGER,
    "threadCacheId" TEXT NOT NULL,
    CONSTRAINT "ThreadCacheResponse_threadCacheId_fkey" FOREIGN KEY ("threadCacheId") REFERENCES "ThreadCache" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "CatalogCacheThread_no_idx" ON "CatalogCacheThread"("no");

-- CreateIndex
CREATE UNIQUE INDEX "CatalogCacheThread_board_no_key" ON "CatalogCacheThread"("board", "no");

-- CreateIndex
CREATE INDEX "ThreadCache_no_board_idx" ON "ThreadCache"("no", "board");

-- CreateIndex
CREATE UNIQUE INDEX "ThreadCache_no_board_key" ON "ThreadCache"("no", "board");
