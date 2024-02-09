import { Module } from '@nestjs/common';
import { AlmoxarifeController } from './almoxarife.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlmoxarifeService } from './almoxarife.service';

@Module({
  imports: [PrismaModule],
  providers: [AlmoxarifeService],
  controllers: [AlmoxarifeController]
})
export class AlmoxarifeModule {}
