-- CreateTable
CREATE TABLE "ShipCompliance" (
    "id" TEXT NOT NULL,
    "shipId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "cbGco2eq" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ShipCompliance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankEntry" (
    "id" TEXT NOT NULL,
    "shipId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "amountGco2eq" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BankEntry_pkey" PRIMARY KEY ("id")
);
