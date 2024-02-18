import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioService } from './usuario.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  imports: [PrismaModule],
  providers: [
    UsuarioService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
