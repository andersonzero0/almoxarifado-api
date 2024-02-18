import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { ProdutoModule } from './produto/produto.module';
import { RequisicaoModule } from './requisicao/requisicao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsuarioModule,
    PrismaModule,
    AuthModule,
    FornecedorModule,
    ProdutoModule,
    RequisicaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
