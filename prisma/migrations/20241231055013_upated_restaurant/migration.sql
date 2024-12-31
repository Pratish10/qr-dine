/*
  Warnings:

  - You are about to drop the column `upiId` on the `Restaurant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Restaurant_upiId_key";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "upiId";
