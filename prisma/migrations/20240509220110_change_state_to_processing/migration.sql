-- Start the transaction
BEGIN;
CREATE TYPE "UserStateNew" AS ENUM ('AWAITING_CONNECTION', 'CONNECTED', 'FAILED', 'PROCESSING', 'STATS_DATA_READY', 'COMPLETED');
-- Update the user state column to use the new type and map CRUNCHING_DATA to PROCESSING
ALTER TABLE "user" ALTER COLUMN "state" DROP DEFAULT;
UPDATE "user" SET "state" = 'PROCESSING' WHERE "state" = 'CRUNCHING_DATA';
ALTER TABLE "user" ALTER COLUMN "state" TYPE "UserStateNew" USING ("state"::text::"UserStateNew");

ALTER TYPE "UserState" RENAME TO "UserStateOld";

ALTER TYPE "UserStateNew" RENAME TO "UserState";

DROP TYPE "UserStateOld";

ALTER TABLE "user" ALTER COLUMN "state" SET DEFAULT 'AWAITING_CONNECTION';

-- Commit the transaction to apply the changes
COMMIT;
