/*
  Warnings:

  - The `status` column on the `Requisicao` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'APROVADO', 'NEGADO');

-- AlterTable
ALTER TABLE "Requisicao" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "fornecedores_tb" ALTER COLUMN "tax_id" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "cep" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "corporateReason" DROP NOT NULL,
ALTER COLUMN "agent" DROP NOT NULL,
ALTER COLUMN "bank" DROP NOT NULL,
ALTER COLUMN "agency" DROP NOT NULL,
ALTER COLUMN "account" DROP NOT NULL;
