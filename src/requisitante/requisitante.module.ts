import { Module } from '@nestjs/common';
import { RequisitanteService } from './requisitante.service';
import { RequisitanteController } from './requisitante.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RequisitanteService],
  controllers: [RequisitanteController],
  exports: [RequisitanteService]
})
export class RequisitanteModule {}
