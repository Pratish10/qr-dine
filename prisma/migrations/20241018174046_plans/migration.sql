-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT[],
    "maxMenus" INTEGER NOT NULL,
    "maxRestaurants" INTEGER NOT NULL,
    "maxTables" INTEGER NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_name_key" ON "Plan"("name");
