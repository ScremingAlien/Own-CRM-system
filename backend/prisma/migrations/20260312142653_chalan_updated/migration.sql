-- AlterTable
ALTER TABLE "Chalan" ADD COLUMN     "invoiceId" TEXT;

-- AddForeignKey
ALTER TABLE "Chalan" ADD CONSTRAINT "Chalan_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
