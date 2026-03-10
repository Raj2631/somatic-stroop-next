/*
  Warnings:

  - Added the required column `groupName` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phqScore` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socioEconomicStatus` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "groupName" TEXT NOT NULL,
ADD COLUMN     "phqScore" INTEGER NOT NULL,
ADD COLUMN     "socioEconomicStatus" TEXT NOT NULL;
