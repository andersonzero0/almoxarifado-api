import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FornecedorModule } from 'src/fornecedor/fornecedor.module';
import { AlmoxarifeModule } from 'src/almoxarife/almoxarife.module';

@Module({
  imports: [PrismaModule, FornecedorModule, AlmoxarifeModule],
  providers: [ProdutoService],
  controllers: [ProdutoController]
})
export class ProdutoModule {}
