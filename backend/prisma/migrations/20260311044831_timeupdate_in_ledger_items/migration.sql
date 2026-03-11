/*
  Warnings:

  - You are about to drop the column `monthKey` on the `AttendanceDay` table. All the data in the column will be lost.
  - Added the required column `month` to the `LedgerEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `LedgerEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AttendanceDay_monthKey_idx";

-- AlterTable
ALTER TABLE "AttendanceDay" DROP COLUMN "monthKey";

-- AlterTable
ALTER TABLE "LedgerEntry" ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
