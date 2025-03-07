-- AlterTable
ALTER TABLE "soulpromise" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "soulpromise" ADD CONSTRAINT "soulpromise_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "soulpromise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
