-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plantId" TEXT NOT NULL DEFAULT '38250b3b-fdab-4f74-97a8-ea4a9b9839b4';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plan"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
