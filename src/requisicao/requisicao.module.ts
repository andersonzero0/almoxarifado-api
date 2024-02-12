import { Module } from '@nestjs/common';
import { RequisicaoService } from './requisicao.service';
import { RequisicaoController } from './requisicao.controller';
import { RequisitanteModule } from 'src/requisitante/requisitante.module';
import { AlmoxarifeModule } from 'src/almoxarife/almoxarife.module';
import { ProdutoModule } from 'src/produto/produto.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, RequisitanteModule, AlmoxarifeModule, ProdutoModule],
  providers: [RequisicaoService],
  controllers: [RequisicaoController]
})
export class RequisicaoModule {}
