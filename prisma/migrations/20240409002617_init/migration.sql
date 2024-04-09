-- CreateEnum
CREATE TYPE "UserState" AS ENUM ('AWAITING_CONNECTION', 'CONNECTED', 'CRUNCHING_DATA', 'COMPLETED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "identifier" VARCHAR(255) NOT NULL,
    "state" "UserState" NOT NULL DEFAULT 'AWAITING_CONNECTION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episode" (
    "id" TEXT NOT NULL,
    "season" INTEGER,
    "episode" INTEGER,
    "showID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "show" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "numberOfEpisodes" INTEGER NOT NULL,
    "genre" VARCHAR(255),
    "imageURL" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userEpisode" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "episodeID" TEXT NOT NULL,
    "datePlayed" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userShow" (
    "userID" TEXT NOT NULL,
    "showID" TEXT NOT NULL,

    CONSTRAINT "userShow_pkey" PRIMARY KEY ("userID","showID")
);

-- CreateTable
CREATE TABLE "actor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "imageURL" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_actorToshow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_identifier_key" ON "user"("identifier");

-- CreateIndex
CREATE INDEX "episode_showID_idx" ON "episode"("showID");

-- CreateIndex
CREATE UNIQUE INDEX "episode_showID_season_episode_key" ON "episode"("showID", "season", "episode");

-- CreateIndex
CREATE UNIQUE INDEX "show_title_key" ON "show"("title");

-- CreateIndex
CREATE INDEX "userEpisode_userID_idx" ON "userEpisode"("userID");

-- CreateIndex
CREATE INDEX "userEpisode_episodeID_idx" ON "userEpisode"("episodeID");

-- CreateIndex
CREATE UNIQUE INDEX "actor_name_key" ON "actor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_actorToshow_AB_unique" ON "_actorToshow"("A", "B");

-- CreateIndex
CREATE INDEX "_actorToshow_B_index" ON "_actorToshow"("B");

-- AddForeignKey
ALTER TABLE "episode" ADD CONSTRAINT "episode_showID_fkey" FOREIGN KEY ("showID") REFERENCES "show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userEpisode" ADD CONSTRAINT "userEpisode_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userEpisode" ADD CONSTRAINT "userEpisode_episodeID_fkey" FOREIGN KEY ("episodeID") REFERENCES "episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userShow" ADD CONSTRAINT "userShow_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userShow" ADD CONSTRAINT "userShow_showID_fkey" FOREIGN KEY ("showID") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_actorToshow" ADD CONSTRAINT "_actorToshow_A_fkey" FOREIGN KEY ("A") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_actorToshow" ADD CONSTRAINT "_actorToshow_B_fkey" FOREIGN KEY ("B") REFERENCES "show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
