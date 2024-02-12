-- DropForeignKey
ALTER TABLE "Requisicao" DROP CONSTRAINT "Requisicao_almoxarifeId_fkey";

-- AlterTable
ALTER TABLE "Requisicao" ALTER COLUMN "almoxarifeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Requisicao" ADD CONSTRAINT "Requisicao_almoxarifeId_fkey" FOREIGN KEY ("almoxarifeId") REFERENCES "almoxarifes_tb"("id") ON DELETE SET NULL ON UPDATE CASCADE;
