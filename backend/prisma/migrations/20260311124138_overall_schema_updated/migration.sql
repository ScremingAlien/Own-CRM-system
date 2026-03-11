/*
  Warnings:

  - You are about to drop the column `isLabourBill` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `vechileNo` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `srno` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- DropIndex
DROP INDEX "LedgerEntry_date_idx";

-- DropIndex
DROP INDEX "LedgerEntry_partyId_idx";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "isLabourBill",
DROP COLUMN "vechileNo";

-- AlterTable
ALTER TABLE "InvoiceItem" DROP COLUMN "srno",
ADD COLUMN     "hsnCode" TEXT,
ADD COLUMN     "unit" TEXT,
ALTER COLUMN "quantity" SET DEFAULT 1,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedBy" TEXT;

-- CreateTable
CREATE TABLE "Quotation" (
    "id" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "taxableAmount" DECIMAL(12,2) NOT NULL,
    "sgst" DECIMAL(12,2) NOT NULL DEFAULT 9,
    "cgst" DECIMAL(12,2) NOT NULL DEFAULT 9,
    "igst" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "roundOff" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuotationItem" (
    "id" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subdescription" TEXT[],
    "hsnCode" TEXT,
    "unit" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "rate" DECIMAL(10,2) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "QuotationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chalan" (
    "id" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,
    "shipToId" TEXT,
    "chNo" TEXT NOT NULL,
    "vehicleNo" TEXT,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "Chalan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChalanItem" (
    "id" TEXT NOT NULL,
    "chalanId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "subdescription" TEXT[],
    "hsnCode" TEXT,
    "unit" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "weight" INTEGER,

    CONSTRAINT "ChalanItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Quotation_partyId_idx" ON "Quotation"("partyId");

-- CreateIndex
CREATE INDEX "QuotationItem_quotationId_idx" ON "QuotationItem"("quotationId");

-- CreateIndex
CREATE INDEX "Chalan_partyId_idx" ON "Chalan"("partyId");

-- CreateIndex
CREATE INDEX "ChalanItem_chalanId_idx" ON "ChalanItem"("chalanId");

-- CreateIndex
CREATE INDEX "Invoice_financialYearId_idx" ON "Invoice"("financialYearId");

-- CreateIndex
CREATE INDEX "LedgerEntry_partyId_year_month_idx" ON "LedgerEntry"("partyId", "year", "month");

-- CreateIndex
CREATE INDEX "LedgerEntry_partyId_date_idx" ON "LedgerEntry"("partyId", "date");

-- CreateIndex
CREATE INDEX "Party_type_idx" ON "Party"("type");

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationItem" ADD CONSTRAINT "QuotationItem_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chalan" ADD CONSTRAINT "Chalan_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chalan" ADD CONSTRAINT "Chalan_shipToId_fkey" FOREIGN KEY ("shipToId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChalanItem" ADD CONSTRAINT "ChalanItem_chalanId_fkey" FOREIGN KEY ("chalanId") REFERENCES "Chalan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
