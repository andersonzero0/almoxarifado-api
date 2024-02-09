-- CreateTable
CREATE TABLE "almoxarifes_tb" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "almoxarifes_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requisitantes_tb" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requisitantes_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedores_tb" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tax_id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "corporateReason" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fornecedores_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos_tb" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceUnit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fornecedorId" TEXT NOT NULL,

    CONSTRAINT "produtos_tb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoProduto" (
    "id" TEXT NOT NULL,
    "quantityUpdate" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "produtoId" TEXT NOT NULL,
    "almoxarifeId" TEXT NOT NULL,

    CONSTRAINT "HistoricoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requisicao" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requisitanteId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,

    CONSTRAINT "Requisicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "almoxarifes_tb_id_key" ON "almoxarifes_tb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "almoxarifes_tb_username_key" ON "almoxarifes_tb"("username");

-- CreateIndex
CREATE UNIQUE INDEX "requisitantes_tb_id_key" ON "requisitantes_tb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "requisitantes_tb_username_key" ON "requisitantes_tb"("username");

-- CreateIndex
CREATE UNIQUE INDEX "fornecedores_tb_id_key" ON "fornecedores_tb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_tb_id_key" ON "produtos_tb"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HistoricoProduto_id_key" ON "HistoricoProduto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Requisicao_id_key" ON "Requisicao"("id");

-- AddForeignKey
ALTER TABLE "produtos_tb" ADD CONSTRAINT "produtos_tb_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedores_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoProduto" ADD CONSTRAINT "HistoricoProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoProduto" ADD CONSTRAINT "HistoricoProduto_almoxarifeId_fkey" FOREIGN KEY ("almoxarifeId") REFERENCES "almoxarifes_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requisicao" ADD CONSTRAINT "Requisicao_requisitanteId_fkey" FOREIGN KEY ("requisitanteId") REFERENCES "requisitantes_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requisicao" ADD CONSTRAINT "Requisicao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos_tb"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
