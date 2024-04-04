-- CreateEnum
CREATE TYPE "UserState" AS ENUM ('AWAITING_CONNECTION', 'CONNECTED', 'CRUNCHING_DATA', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "identifier" VARCHAR(255) NOT NULL,
    "state" "UserState" NOT NULL DEFAULT 'AWAITING_CONNECTION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "season" INTEGER,
    "episode" INTEGER,
    "showID" TEXT,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Show" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "numberOfEpisodes" INTEGER NOT NULL,
    "genre" VARCHAR(255),
    "imageURL" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEpisode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "episodeID" TEXT NOT NULL,
    "datePlayed" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "imageURL" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActorToShow" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_identifier_key" ON "User"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_showID_season_episode_key" ON "Episode"("showID", "season", "episode");

-- CreateIndex
CREATE UNIQUE INDEX "Show_title_key" ON "Show"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Actor_name_key" ON "Actor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToShow_AB_unique" ON "_ActorToShow"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToShow_B_index" ON "_ActorToShow"("B");

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_showID_fkey" FOREIGN KEY ("showID") REFERENCES "Show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEpisode" ADD CONSTRAINT "UserEpisode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEpisode" ADD CONSTRAINT "UserEpisode_episodeID_fkey" FOREIGN KEY ("episodeID") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToShow" ADD CONSTRAINT "_ActorToShow_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToShow" ADD CONSTRAINT "_ActorToShow_B_fkey" FOREIGN KEY ("B") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
