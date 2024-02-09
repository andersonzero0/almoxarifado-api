import { Module } from '@nestjs/common';
import { AlmoxarifeController } from './almoxarife.controller';

@Module({
  controllers: [AlmoxarifeController]
})
export class AlmoxarifeModule {}
