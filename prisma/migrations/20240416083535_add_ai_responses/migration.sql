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
    "userID" TEXT NOT NULL,

    CONSTRAINT "aiResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aiResponse_userID_key" ON "aiResponse"("userID");

-- AddForeignKey
ALTER TABLE "aiResponse" ADD CONSTRAINT "aiResponse_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
