import { Module } from '@nestjs/common';
import { AlmoxarifeController } from './almoxarife.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlmoxarifeService } from './almoxarife.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [PrismaModule],
  providers: [AlmoxarifeService, {  
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  controllers: [AlmoxarifeController],
  exports: [AlmoxarifeService]
})
export class AlmoxarifeModule {}
