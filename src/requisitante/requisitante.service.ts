import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { CreateRequisitanteDto } from './dto/requisitante.dto';

@Injectable()
export class RequisitanteService {
    constructor(private prisma: PrismaService) {}
    
  async create(requisitanteData: CreateRequisitanteDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(requisitanteData.password, salt);

      return await this.prisma.requisitante.create({
        data: { ...requisitanteData, password: hash },
      });
    } catch (error) {
      throw new BadRequestException();
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
          id
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string) {
    try {
      return await this.prisma.requisitante.findUnique({
        where: {
          username
        }
      })
    } catch (error) {
      throw error;
    }
  }
}
