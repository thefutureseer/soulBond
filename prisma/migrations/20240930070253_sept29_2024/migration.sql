/*
  Warnings:

  - You are about to drop the `promise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "promise" DROP CONSTRAINT "promise_editedById_fkey";

-- DropTable
DROP TABLE "promise";

-- CreateTable
CREATE TABLE "soulpromise" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "editedById" TEXT NOT NULL,
    "version" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "status_us" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "soulpromise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "soulpromise" ADD CONSTRAINT "soulpromise_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
