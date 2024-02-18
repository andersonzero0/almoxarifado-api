import { Module } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [PrismaModule, UsuarioModule],
  providers: [FornecedorService],
  controllers: [FornecedorController],
  exports: [FornecedorService]
})
export class FornecedorModule {}
