/*
  Warnings:

  - A unique constraint covering the columns `[userShowID,title]` on the table `userEpisode` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "userEpisode_userShowID_title_episode_season_key";

-- CreateIndex
CREATE UNIQUE INDEX "userEpisode_userShowID_title_key" ON "userEpisode"("userShowID", "title");
