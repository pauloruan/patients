/*
  Warnings:

  - The `status` column on the `therapies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `local` on the `therapies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TherapyStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Local" AS ENUM ('ONLINE', 'PRESENCIAL');

-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'ARCHIVED';

-- AlterTable
ALTER TABLE "therapies" DROP COLUMN "status",
ADD COLUMN     "status" "TherapyStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "local",
ADD COLUMN     "local" "Local" NOT NULL;

-- DropEnum
DROP TYPE "LOCAL";

-- DropEnum
DROP TYPE "SessionStatus";
