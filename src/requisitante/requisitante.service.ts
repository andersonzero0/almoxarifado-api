import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  CreateRequisitanteDto,
  UpdateRequisitanteDto,
} from './dto/requisitante.dto';
import { ProdutoService } from 'src/produto/produto.service';

@Injectable()
export class RequisitanteService {
  constructor(
    private prisma: PrismaService,
    private produtoService: ProdutoService,
  ) {}

  async create(requisitanteData: CreateRequisitanteDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(requisitanteData.password, salt);

      return await this.prisma.requisitante.create({
        data: { ...requisitanteData, password: hash },
      });
    } catch (error) {
      throw error;
    }
  }

  async findMany() {
    try {
      return await this.prisma.requisitante.findMany({
        select: {
          id: true,
          name: true,
          username: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.prisma.requisitante.findUnique({
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
      return await this.prisma.requisitante.findUnique({
        where: {
          username,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(requisitanteId: string, data: UpdateRequisitanteDto) {
    try {
      const requisitante = await this.findById(requisitanteId)

      if(!requisitante) {
        throw new NotFoundException('Requisitante não encontrado(a)!')
      }

      const isMatch = await bcrypt.compare(data.oldPassword, requisitante.password)

      if(!isMatch) {
        throw new UnauthorizedException('Senha incorreta!')
      }

      delete data.oldPassword
      
      return await this.prisma.requisitante.update({
        data,
        where: {
          id: requisitanteId
        }
      })
    } catch (error) {
      throw error
    }
  }
  
}
