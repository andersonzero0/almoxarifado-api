import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AlmoxarifeService } from 'src/almoxarife/almoxarife.service';
import { RequisitanteService } from 'src/requisitante/requisitante.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

enum TypeUser {
  Almoxarife = 'almoxarife',
  Requisitante = 'requisitante',
}

@Injectable()
export class AuthService {
  constructor(
    private almoxarifeService: AlmoxarifeService,
    private requisitanteService: RequisitanteService,
    private jwtService: JwtService,
  ) {}

  async auth(authDto: AuthDto, typeUser: string) {
    try {
      let user: any;

      if (typeUser == TypeUser.Almoxarife) {
        user = await this.almoxarifeService.findByUsername(authDto.username);
        user = {
          ...user,
          typeUser: TypeUser.Almoxarife,
        };
      } else if (typeUser == TypeUser.Requisitante) {
        user = await this.requisitanteService.findByUsername(authDto.username);
        user = {
          ...user,
          typeUser: TypeUser.Requisitante,
        };
      } else {
        throw new ForbiddenException();
      }

      if(!user.id) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(authDto.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      const payload = { id: user.id, typeUser: user.typeUser };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
