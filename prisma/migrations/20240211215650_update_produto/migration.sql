/*
  Warnings:

  - Added the required column `almoxarifeId` to the `produtos_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos_tb" ADD COLUMN     "almoxarifeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "produtos_tb" ADD CONSTRAINT "produtos_tb_almoxarifeId_fkey" FOREIGN KEY ("almoxarifeId") REFERENCES "almoxarifes_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
