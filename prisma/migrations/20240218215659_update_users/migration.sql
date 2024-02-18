/*
  Warnings:

  - You are about to drop the column `almoxarifeId` on the `HistoricoProduto` table. All the data in the column will be lost.
  - You are about to drop the column `almoxarifeId` on the `Requisicao` table. All the data in the column will be lost.
  - You are about to drop the column `requisitanteId` on the `Requisicao` table. All the data in the column will be lost.
  - You are about to drop the column `almoxarifeId` on the `fornecedores_tb` table. All the data in the column will be lost.
  - You are about to drop the column `almoxarifeId` on the `produtos_tb` table. All the data in the column will be lost.
  - You are about to drop the `almoxarifes_tb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requisitantes_tb` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `HistoricoProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Requisicao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `fornecedores_tb` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `produtos_tb` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'ALMOXARIFE', 'REQUISITANTE');

-- DropForeignKey
ALTER TABLE "HistoricoProduto" DROP CONSTRAINT "HistoricoProduto_almoxarifeId_fkey";

-- DropForeignKey
ALTER TABLE "Requisicao" DROP CONSTRAINT "Requisicao_almoxarifeId_fkey";

-- DropForeignKey
ALTER TABLE "Requisicao" DROP CONSTRAINT "Requisicao_requisitanteId_fkey";

-- DropForeignKey
ALTER TABLE "fornecedores_tb" DROP CONSTRAINT "fornecedores_tb_almoxarifeId_fkey";

-- DropForeignKey
ALTER TABLE "produtos_tb" DROP CONSTRAINT "produtos_tb_almoxarifeId_fkey";

-- AlterTable
ALTER TABLE "HistoricoProduto" DROP COLUMN "almoxarifeId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Requisicao" DROP COLUMN "almoxarifeId",
DROP COLUMN "requisitanteId",
ADD COLUMN     "authorizerId" TEXT,
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "fornecedores_tb" DROP COLUMN "almoxarifeId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "produtos_tb" DROP COLUMN "almoxarifeId",
ADD COLUMN     "creatorId" TEXT NOT NULL;

-- DropTable
DROP TABLE "almoxarifes_tb";

-- DropTable
DROP TABLE "requisitantes_tb";

-- CreateTable
CREATE TABLE "usuarios_tb" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_tb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_tb_id_key" ON "usuarios_tb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_tb_username_key" ON "usuarios_tb"("username");

-- AddForeignKey
ALTER TABLE "fornecedores_tb" ADD CONSTRAINT "fornecedores_tb_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "usuarios_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos_tb" ADD CONSTRAINT "produtos_tb_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "usuarios_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoProduto" ADD CONSTRAINT "HistoricoProduto_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "usuarios_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requisicao" ADD CONSTRAINT "Requisicao_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "usuarios_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requisicao" ADD CONSTRAINT "Requisicao_authorizerId_fkey" FOREIGN KEY ("authorizerId") REFERENCES "usuarios_tb"("id") ON DELETE SET NULL ON UPDATE CASCADE;
