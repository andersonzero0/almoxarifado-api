import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFornecedorDto } from './dto/fornecedor.dto';
import { AlmoxarifeService } from 'src/almoxarife/almoxarife.service';

@Injectable()
export class FornecedorService {
  constructor(
    private prisma: PrismaService,
    private almoxarifeService: AlmoxarifeService,
  ) {}

  async create(createFornecedorDto: CreateFornecedorDto, almoxarifeId: string) {
    try {
      const almoxarife = await this.almoxarifeService.findById(almoxarifeId);

      if (!almoxarife) {
        throw new NotFoundException('Almoxarife não encontrado(a)!')
      }

      return await this.prisma.fornecedor.create({
        data: {
          ...createFornecedorDto,
          almoxarifeId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findMany() {
    try {
      return await this.prisma.fornecedor.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.prisma.fornecedor.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(fornecedorId: string, data: CreateFornecedorDto) {
    try {
      const fornecedor = await this.findById(fornecedorId);

      if (!fornecedor) {
        throw new NotFoundException('Fornecedor não encontrado(a)!')
      }

      return await this.prisma.fornecedor.update({
        data,
        where: {
          id: fornecedorId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(fornecedorId: string) {
    try {
      const fornecedor = await this.findById(fornecedorId);

      if (!fornecedor) {
        throw new NotFoundException('Fornecedor não encontrado(a)!')
      }

      return await this.prisma.fornecedor.delete({
        where: {
          id: fornecedorId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
