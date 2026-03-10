/*
  Warnings:

  - The values [HALF_DAY] on the enum `AttendanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PAID] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [BOTH] on the enum `PartyType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `createdAt` on the `AttendanceDay` table. All the data in the column will be lost.
  - You are about to drop the column `overtimeHours` on the `AttendanceItem` table. All the data in the column will be lost.
  - You are about to drop the column `gstAmount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Worker` table. All the data in the column will be lost.
  - Added the required column `taxableAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttendanceStatus_new" AS ENUM ('PRESENT', 'ABSENT');
ALTER TABLE "AttendanceItem" ALTER COLUMN "status" TYPE "AttendanceStatus_new" USING ("status"::text::"AttendanceStatus_new");
ALTER TYPE "AttendanceStatus" RENAME TO "AttendanceStatus_old";
ALTER TYPE "AttendanceStatus_new" RENAME TO "AttendanceStatus";
DROP TYPE "public"."AttendanceStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "InvoiceStatus_new" AS ENUM ('DRAFT', 'SENT', 'CANCELLED');
ALTER TABLE "public"."Invoice" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Invoice" ALTER COLUMN "status" TYPE "InvoiceStatus_new" USING ("status"::text::"InvoiceStatus_new");
ALTER TYPE "InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "public"."InvoiceStatus_old";
ALTER TABLE "Invoice" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PartyType_new" AS ENUM ('CUSTOMER', 'SUPPLIER');
ALTER TABLE "Party" ALTER COLUMN "type" TYPE "PartyType_new" USING ("type"::text::"PartyType_new");
ALTER TYPE "PartyType" RENAME TO "PartyType_old";
ALTER TYPE "PartyType_new" RENAME TO "PartyType";
DROP TYPE "public"."PartyType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AttendanceItem" DROP CONSTRAINT "AttendanceItem_attendanceDayId_fkey";

-- DropForeignKey
ALTER TABLE "AttendanceItem" DROP CONSTRAINT "AttendanceItem_workerId_fkey";

-- AlterTable
ALTER TABLE "AttendanceDay" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "AttendanceItem" DROP COLUMN "overtimeHours";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "gstAmount",
DROP COLUMN "subtotal",
DROP COLUMN "updatedAt",
ADD COLUMN     "cgst" DECIMAL(12,2) NOT NULL DEFAULT 9,
ADD COLUMN     "chNo" TEXT,
ADD COLUMN     "igst" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "isLabourBill" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "poNo" TEXT,
ADD COLUMN     "roundOff" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN     "sgst" DECIMAL(12,2) NOT NULL DEFAULT 9,
ADD COLUMN     "shipToId" TEXT,
ADD COLUMN     "stateCode" TEXT,
ADD COLUMN     "taxableAmount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "vechileNo" TEXT;

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "srno" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "subdescription" TEXT[],
ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "AttendanceItem" ADD CONSTRAINT "AttendanceItem_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceItem" ADD CONSTRAINT "AttendanceItem_attendanceDayId_fkey" FOREIGN KEY ("attendanceDayId") REFERENCES "AttendanceDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_shipToId_fkey" FOREIGN KEY ("shipToId") REFERENCES "Party"("id") ON DELETE SET NULL ON UPDATE CASCADE;
