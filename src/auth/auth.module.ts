import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AlmoxarifeModule } from 'src/almoxarife/almoxarife.module';
import { RequisitanteModule } from 'src/requisitante/requisitante.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [AlmoxarifeModule, RequisitanteModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '30d' }
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
