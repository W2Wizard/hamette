-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResetTokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationTokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'user',
    "first_name" TEXT,
    "last_name" TEXT,
    "hash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "born_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "died_at" DATETIME,
    "age" INTEGER,
    "male" BOOLEAN NOT NULL DEFAULT false,
    "picture" TEXT,
    "occupation" TEXT,
    "bio" TEXT,
    "birthplace" TEXT,
    "marriage_id" INTEGER,
    CONSTRAINT "person_marriage_id_fkey" FOREIGN KEY ("marriage_id") REFERENCES "marriages" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "marriages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "husband_id" INTEGER NOT NULL,
    "wife_id" INTEGER,
    CONSTRAINT "marriages_husband_id_fkey" FOREIGN KEY ("husband_id") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "marriages_wife_id_fkey" FOREIGN KEY ("wife_id") REFERENCES "person" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationTokens_user_id_key" ON "VerificationTokens"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "person_first_name_middle_name_last_name_marriage_id_key" ON "person"("first_name", "middle_name", "last_name", "marriage_id");

-- CreateIndex
CREATE UNIQUE INDEX "marriages_husband_id_wife_id_key" ON "marriages"("husband_id", "wife_id");
