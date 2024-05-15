/*
  Warnings:

  - The values [ACCEPTED,REJECTED] on the enum `SessionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dates` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `patients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[patient_id]` on the table `therapies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[psychologist_id]` on the table `therapies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SessionStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELED');
ALTER TABLE "therapies" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "therapies" ALTER COLUMN "status" TYPE "SessionStatus_new" USING ("status"::text::"SessionStatus_new");
ALTER TYPE "SessionStatus" RENAME TO "SessionStatus_old";
ALTER TYPE "SessionStatus_new" RENAME TO "SessionStatus";
DROP TYPE "SessionStatus_old";
ALTER TABLE "therapies" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "patients" DROP CONSTRAINT "patients_user_id_fkey";

-- DropIndex
DROP INDEX "patients_user_id_key";

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "dates",
DROP COLUMN "user_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "therapies_patient_id_key" ON "therapies"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "therapies_psychologist_id_key" ON "therapies"("psychologist_id");
