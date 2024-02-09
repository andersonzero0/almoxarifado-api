import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlmoxarifeModule } from './almoxarife/almoxarife.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AlmoxarifeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
