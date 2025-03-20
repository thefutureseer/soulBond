-- CreateEnum
CREATE TYPE "status_us" AS ENUM ('PENDING', 'COMPLETED', 'BROKEN');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soulpromise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "status_us" NOT NULL DEFAULT 'PENDING',
    "createdById" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "soulpromise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "editslog" (
    "id" TEXT NOT NULL,
    "editedByUserId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "changes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "editslog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "soulpromise" ADD CONSTRAINT "soulpromise_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editslog" ADD CONSTRAINT "editslog_editedByUserId_fkey" FOREIGN KEY ("editedByUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editslog" ADD CONSTRAINT "edits_promiseId_fkey" FOREIGN KEY ("parentId") REFERENCES "soulpromise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
