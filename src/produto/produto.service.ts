import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from './dto/produto.dto';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';
import { AlmoxarifeService } from 'src/almoxarife/almoxarife.service';

@Injectable()
export class ProdutoService {
  constructor(
    private prisma: PrismaService,
    private fornecedorService: FornecedorService,
    private almoxarifeService: AlmoxarifeService
  ) {}

  async create(createProdutoDto: CreateProdutoDto, almoxarifeId: string) {
    try {
      const almoxarife = await this.almoxarifeService.findById(almoxarifeId)

      if(!almoxarife) {
        throw new ForbiddenException()
      }

      const fornecedor = await this.fornecedorService.findById(createProdutoDto.fornecedorId)

      if(!fornecedor) {
        throw new ForbiddenException()
      }
      
      return await this.prisma.produto.create({
        data: {
          ...createProdutoDto,
          almoxarifeId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
