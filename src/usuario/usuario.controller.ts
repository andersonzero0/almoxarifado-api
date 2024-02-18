import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      return await this.usuarioService.create(createUsuarioDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get()
  @Roles(Role.ADMIN)
  async findMany() {
    try {
      return await this.usuarioService.findMany();
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get(':id')
  async findById(@Param('id') usuarioId: string) {
    try {
      const usuario = await this.usuarioService.findById(usuarioId);

      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado(a)!')
      }

      delete usuario.password;

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Put()
  async update(@Request() req: any, @Body() data: UpdateUsuarioDto) {
    try {
      return await this.usuarioService.update(req.user.id, data);
    } catch (error) {
      throw error;
    }
  }
}
