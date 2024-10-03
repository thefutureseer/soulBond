-- AlterTable
ALTER TABLE "soulpromise" ALTER COLUMN "version" SET DEFAULT 0,
ALTER COLUMN "version" DROP DEFAULT;
DROP SEQUENCE "soulpromise_version_seq";
