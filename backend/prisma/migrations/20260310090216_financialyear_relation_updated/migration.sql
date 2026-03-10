-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_financialYearId_fkey";

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_financialYearId_fkey" FOREIGN KEY ("financialYearId") REFERENCES "FinancialYear"("label") ON DELETE SET NULL ON UPDATE CASCADE;
