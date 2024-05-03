-- AlterTable
ALTER TABLE "actor" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "dataKey" TEXT NOT NULL DEFAULT '';
