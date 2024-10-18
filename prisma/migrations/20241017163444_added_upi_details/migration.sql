/*
  Warnings:

  - A unique constraint covering the columns `[upiId]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `upiId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "upiId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_upiId_key" ON "Restaurant"("upiId");
