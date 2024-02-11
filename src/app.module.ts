import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlmoxarifeModule } from './almoxarife/almoxarife.module';
import { PrismaModule } from './prisma/prisma.module';
import { RequisitanteModule } from './requisitante/requisitante.module';
import { AuthModule } from './auth/auth.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AlmoxarifeModule,
    PrismaModule,
    RequisitanteModule,
    AuthModule,
    FornecedorModule,
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
