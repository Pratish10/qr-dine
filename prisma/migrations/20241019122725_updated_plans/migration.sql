-- CreateEnum
CREATE TYPE "planTypes" AS ENUM ('free', 'starter', 'pro');

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "type" "planTypes" NOT NULL DEFAULT 'free';
