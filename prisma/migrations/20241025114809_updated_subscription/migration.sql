/*
  Warnings:

  - Made the column `endDate` on table `Subscription` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "productId" TEXT,
ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "subscriptionId" DROP NOT NULL,
ALTER COLUMN "priceId" DROP NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
