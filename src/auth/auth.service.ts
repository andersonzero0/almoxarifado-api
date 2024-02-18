import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async auth(authDto: AuthDto) {
    try {
      const user = await this.usuarioService.findByUsername(authDto.username)

      if(!user.id) {
        throw new UnauthorizedException();
      }

      const isMatch = await bcrypt.compare(authDto.password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException();
      }

      delete user.password
      delete user.id

      const payload = { id: user.id, role: user.role };
      return {
        ...user,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }
}
