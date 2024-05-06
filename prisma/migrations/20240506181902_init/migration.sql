-- CreateEnum
CREATE TYPE "UserState" AS ENUM ('AWAITING_CONNECTION', 'CONNECTED', 'CRUNCHING_DATA', 'STATS_DATA_READY', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AssistantName" AS ENUM ('TV_BFF', 'FIRST_AND_MOST_REWATCHED_SHOW_QUIPS', 'TOP_GENRES_STAR_SIGN');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "identifier" VARCHAR(255) NOT NULL,
    "state" "UserState" NOT NULL DEFAULT 'AWAITING_CONNECTION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataKey" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "show" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "numberOfEpisodes" INTEGER,
    "rottenTomatoScore" INTEGER,
    "genre" VARCHAR(255)[],
    "imageURL" VARCHAR(255),
    "summary" VARCHAR(1089),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userShow" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "showID" TEXT NOT NULL,

    CONSTRAINT "userShow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userEpisode" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "season" INTEGER,
    "episode" INTEGER,
    "datePlayed" TIMESTAMP(3) NOT NULL,
    "userShowID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "showActor" (
    "actorID" TEXT NOT NULL,
    "showID" TEXT NOT NULL,
    "characterName" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,

    CONSTRAINT "showActor_pkey" PRIMARY KEY ("actorID","showID")
);

-- CreateTable
CREATE TABLE "assistant" (
    "id" TEXT NOT NULL,
    "name" "AssistantName" NOT NULL,
    "assistantID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assistant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aiResponse" (
    "id" TEXT NOT NULL,
    "topGenresQuip" TEXT,
    "starSign" TEXT,
    "starSignQuip" TEXT,
    "rtScoreQuip" TEXT,
    "personality" TEXT,
    "personalityQuip" TEXT,
    "firstTVShowQuip" TEXT,
    "mostRewatchedTVShowQuip" TEXT,
    "bff" TEXT,
    "bffQuip" TEXT,
    "bffImageURL" TEXT,
    "userID" TEXT NOT NULL,

    CONSTRAINT "aiResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_identifier_key" ON "user"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "show_title_key" ON "show"("title");

-- CreateIndex
CREATE UNIQUE INDEX "userShow_userID_showID_key" ON "userShow"("userID", "showID");

-- CreateIndex
CREATE INDEX "userEpisode_userShowID_idx" ON "userEpisode"("userShowID");

-- CreateIndex
CREATE UNIQUE INDEX "userEpisode_userShowID_title_key" ON "userEpisode"("userShowID", "title");

-- CreateIndex
CREATE UNIQUE INDEX "actor_name_key" ON "actor"("name");

-- CreateIndex
CREATE INDEX "showActor_showID_idx" ON "showActor"("showID");

-- CreateIndex
CREATE INDEX "showActor_characterName_idx" ON "showActor"("characterName");

-- CreateIndex
CREATE UNIQUE INDEX "assistant_name_key" ON "assistant"("name");

-- CreateIndex
CREATE INDEX "assistant_name_idx" ON "assistant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "aiResponse_userID_key" ON "aiResponse"("userID");

-- AddForeignKey
ALTER TABLE "userShow" ADD CONSTRAINT "userShow_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userShow" ADD CONSTRAINT "userShow_showID_fkey" FOREIGN KEY ("showID") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userEpisode" ADD CONSTRAINT "userEpisode_userShowID_fkey" FOREIGN KEY ("userShowID") REFERENCES "userShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showActor" ADD CONSTRAINT "showActor_actorID_fkey" FOREIGN KEY ("actorID") REFERENCES "actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showActor" ADD CONSTRAINT "showActor_showID_fkey" FOREIGN KEY ("showID") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aiResponse" ADD CONSTRAINT "aiResponse_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
