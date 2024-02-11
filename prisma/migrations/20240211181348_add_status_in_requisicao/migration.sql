/*
  Warnings:

  - Added the required column `status` to the `Requisicao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `almoxarifeId` to the `fornecedores_tb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Requisicao" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "fornecedores_tb" ADD COLUMN     "almoxarifeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "fornecedores_tb" ADD CONSTRAINT "fornecedores_tb_almoxarifeId_fkey" FOREIGN KEY ("almoxarifeId") REFERENCES "almoxarifes_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
