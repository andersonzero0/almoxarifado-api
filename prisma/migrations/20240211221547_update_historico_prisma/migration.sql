/*
  Warnings:

  - The `status` column on the `Requisicao` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `action` to the `HistoricoProduto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActionHistorico" AS ENUM ('ADDED', 'REMOVED');

-- CreateEnum
CREATE TYPE "StatusRequisicao" AS ENUM ('PENDENTE', 'APROVADO', 'NEGADO');

-- AlterTable
ALTER TABLE "HistoricoProduto" ADD COLUMN     "action" "ActionHistorico" NOT NULL;

-- AlterTable
ALTER TABLE "Requisicao" DROP COLUMN "status",
ADD COLUMN     "status" "StatusRequisicao" NOT NULL DEFAULT 'PENDENTE';

-- DropEnum
DROP TYPE "Status";
