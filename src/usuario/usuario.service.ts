import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(usuarioData: CreateUsuarioDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(usuarioData.password, salt);

      return await this.prisma.usuario.create({
        data: { ...usuarioData, password: hash },
        select: {
          name: true,
          username: true,
          createdAt: true,
          role: true
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findMany() {
    try {
      return await this.prisma.usuario.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          role: true
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.prisma.usuario.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string) {
    try {
      return await this.prisma.usuario.findUnique({
        where: {
          username,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(usuarioId: string, data: UpdateUsuarioDto) {
    try {
      const usuario = await this.findById(usuarioId)

      if(!usuario) {
        throw new NotFoundException('Usuário não encontrado(a)!')
      }

      const isMatch = await bcrypt.compare(data.oldPassword, usuario.password)

      if(!isMatch) {
        throw new UnauthorizedException('Senha incorreta!')
      }

      delete data.oldPassword
      
      return await this.prisma.usuario.update({
        data,
        where: {
          id: usuarioId
        }
      })
    } catch (error) {
      throw error
    }
  }
}
