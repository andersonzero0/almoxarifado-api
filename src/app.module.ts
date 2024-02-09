import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlmoxarifeModule } from './almoxarife/almoxarife.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AlmoxarifeModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
