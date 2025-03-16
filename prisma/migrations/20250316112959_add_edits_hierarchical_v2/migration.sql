/*
  Warnings:

  - You are about to drop the column `editedById` on the `soulpromise` table. All the data in the column will be lost.
  - You are about to drop the `edits` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "edits" DROP CONSTRAINT "edits_editedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "edits" DROP CONSTRAINT "edits_parentId_fkey_history";

-- DropForeignKey
ALTER TABLE "edits" DROP CONSTRAINT "edits_parentId_fkey_parent";

-- DropForeignKey
ALTER TABLE "edits" DROP CONSTRAINT "edits_promiseId_fkey";

-- DropForeignKey
ALTER TABLE "soulpromise" DROP CONSTRAINT "soulpromise_editedById_fkey";

-- AlterTable
ALTER TABLE "soulpromise" DROP COLUMN "editedById",
ADD COLUMN     "createdById" TEXT;

-- DropTable
DROP TABLE "edits";

-- CreateTable
CREATE TABLE "editslog" (
    "id" TEXT NOT NULL,
    "editedByUserId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "changes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "editslog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "soulpromise" ADD CONSTRAINT "soulpromise_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editslog" ADD CONSTRAINT "editslog_editedByUserId_fkey" FOREIGN KEY ("editedByUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "editslog" ADD CONSTRAINT "edits_promiseId_fkey" FOREIGN KEY ("parentId") REFERENCES "soulpromise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
