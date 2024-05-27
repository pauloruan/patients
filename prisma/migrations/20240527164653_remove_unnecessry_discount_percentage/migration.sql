/*
  Warnings:

  - You are about to drop the column `discount_percentage` on the `therapies` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `therapies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "therapies" DROP COLUMN "discount_percentage",
DROP COLUMN "duration";
