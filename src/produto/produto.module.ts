import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FornecedorModule } from 'src/fornecedor/fornecedor.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [PrismaModule, FornecedorModule, UsuarioModule],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [ProdutoService]
})
export class ProdutoModule {}
