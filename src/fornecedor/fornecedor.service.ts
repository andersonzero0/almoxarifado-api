import { ForbiddenException, Injectable } from '@nestjs/common';
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
        throw new ForbiddenException();
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
      return await this.prisma.fornecedor.findMany()
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.prisma.fornecedor.findUnique({
        where: {
          id
        }
      })
    } catch (error) {
      throw error;
    }
  }
}
