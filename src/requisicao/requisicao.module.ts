import { Module } from '@nestjs/common';
import { RequisicaoService } from './requisicao.service';
import { RequisicaoController } from './requisicao.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { ProdutoModule } from 'src/produto/produto.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, UsuarioModule, ProdutoModule],
  providers: [RequisicaoService],
  controllers: [RequisicaoController]
})
export class RequisicaoModule {}
