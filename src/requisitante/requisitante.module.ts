import { Module } from '@nestjs/common';
import { RequisitanteService } from './requisitante.service';
import { RequisitanteController } from './requisitante.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProdutoModule } from 'src/produto/produto.module';

@Module({
  imports: [PrismaModule, ProdutoModule],
  providers: [RequisitanteService],
  controllers: [RequisitanteController],
  exports: [RequisitanteService]
})
export class RequisitanteModule {}
