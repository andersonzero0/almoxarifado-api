import { Module } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlmoxarifeModule } from 'src/almoxarife/almoxarife.module';

@Module({
  imports: [PrismaModule, AlmoxarifeModule],
  providers: [FornecedorService],
  controllers: [FornecedorController],
  exports: [FornecedorService]
})
export class FornecedorModule {}
