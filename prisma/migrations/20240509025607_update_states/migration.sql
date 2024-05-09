/*
  Warnings:

  - The values [CRUNCHING_DATA,STATS_DATA_READY] on the enum `UserState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserState_new" AS ENUM ('AWAITING_CONNECTION', 'CONNECTED', 'FAILED', 'PROCESSING', 'FIRST_PHASE_READY', 'SECOND_PHASE_READY', 'COMPLETED');
ALTER TABLE "user" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "state" TYPE "UserState_new" USING ("state"::text::"UserState_new");
ALTER TYPE "UserState" RENAME TO "UserState_old";
ALTER TYPE "UserState_new" RENAME TO "UserState";
DROP TYPE "UserState_old";
ALTER TABLE "user" ALTER COLUMN "state" SET DEFAULT 'AWAITING_CONNECTION';
COMMIT;
