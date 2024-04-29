/*
  Warnings:

  - Added the required column `popularity` to the `showActor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "showActor" ADD COLUMN     "popularity" INTEGER NOT NULL;
