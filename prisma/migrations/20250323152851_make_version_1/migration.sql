/*
  Warnings:

  - Made the column `createdById` on table `soulpromise` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "soulpromise" DROP CONSTRAINT "soulpromise_createdById_fkey";

-- AlterTable
ALTER TABLE "soulpromise" ALTER COLUMN "version" SET DEFAULT 1,
ALTER COLUMN "createdById" SET NOT NULL;

-- CreateTable
CREATE TABLE "test_table" (
    "id" INTEGER NOT NULL,
    "name" TEXT,

    CONSTRAINT "test_table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "soulpromise" ADD CONSTRAINT "soulpromise_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
