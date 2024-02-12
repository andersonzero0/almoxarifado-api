/*
  Warnings:

  - Added the required column `almoxarifeId` to the `Requisicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requisicao" ADD COLUMN     "almoxarifeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Requisicao" ADD CONSTRAINT "Requisicao_almoxarifeId_fkey" FOREIGN KEY ("almoxarifeId") REFERENCES "almoxarifes_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
