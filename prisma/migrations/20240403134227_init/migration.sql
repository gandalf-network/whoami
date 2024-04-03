-- CreateTable
CREATE TABLE "Show" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "dataPlayed" TIMESTAMP(6) NOT NULL,
    "genre" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "episode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "showID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_showID_fkey" FOREIGN KEY ("showID") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
