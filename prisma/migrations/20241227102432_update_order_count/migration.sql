-- CreateTable
CREATE TABLE "OrderCount" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "OrderCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderCount_date_key" ON "OrderCount"("date");
