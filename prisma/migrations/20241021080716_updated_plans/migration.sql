/*
  Warnings:

  - The `price` column on the `Plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Plan" ALTER COLUMN "maxMenus" SET DEFAULT 15,
ALTER COLUMN "maxRestaurants" SET DEFAULT 2,
ALTER COLUMN "maxTables" SET DEFAULT 6,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
