import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlmoxarifeDto, UpdateAlmoxarifeDto } from './dto/almoxarife.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AlmoxarifeService {
  constructor(private prisma: PrismaService) {}

  async create(almoxarifeData: CreateAlmoxarifeDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(almoxarifeData.password, salt);

      return await this.prisma.almoxarife.create({
        data: { ...almoxarifeData, password: hash },
        select: {
          name: true,
          username: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findMany() {
    try {
      return await this.prisma.almoxarife.findMany({
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
      return await this.prisma.almoxarife.findUnique({
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
      return await this.prisma.almoxarife.findUnique({
        where: {
          username,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(almoxarifeId: string, data: UpdateAlmoxarifeDto) {
    try {
      const almoxarife = await this.findById(almoxarifeId)

      if(!almoxarife) {
        throw new NotFoundException('Almoxarife não encontrado(a)!')
      }

      const isMatch = await bcrypt.compare(data.oldPassword, almoxarife.password)

      if(!isMatch) {
        throw new UnauthorizedException('Senha incorreta!')
      }

      delete data.oldPassword
      
      return await this.prisma.almoxarife.update({
        data,
        where: {
          id: almoxarifeId
        }
      })
    } catch (error) {
      throw error
    }
  }
}
