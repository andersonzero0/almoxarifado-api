import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ActionProdutoDto,
  CreateProdutoDto,
  OperationsUpdateProduct,
  UpdateProdutoDto,
} from './dto/produto.dto';
import { FornecedorService } from 'src/fornecedor/fornecedor.service';
import { AlmoxarifeService } from 'src/almoxarife/almoxarife.service';

@Injectable()
export class ProdutoService {
  constructor(
    private prisma: PrismaService,
    private fornecedorService: FornecedorService,
    private almoxarifeService: AlmoxarifeService,
  ) {}

  async create(createProdutoDto: CreateProdutoDto, almoxarifeId: string) {
    try {
      const almoxarife = await this.almoxarifeService.findById(almoxarifeId);

      if (!almoxarife) {
        throw new NotFoundException('Almoxarife não encontrado(a)!')
      }

      const fornecedor = await this.fornecedorService.findById(
        createProdutoDto.fornecedorId,
      );

      if (!fornecedor) {
        throw new NotFoundException('Fornecedor não encontrado(a)!')
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

  async findMany() {
    try {
      return await this.prisma.produto.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findById(produtoId: string) {
    try {
      return await this.prisma.produto.findUnique({
        where: {
          id: produtoId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string) {
    try {
      return await this.prisma.produto.findMany({
        where: {
          name,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(produtoId: string, data: UpdateProdutoDto) {
    try {
      const produto = await this.findById(produtoId);

      if (!produto) {
        throw new NotFoundException('Produto não encontrado(a)!')
      }

      return await this.prisma.produto.update({
        data,
        where: {
          id: produtoId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateQuantity(produtoId: string, quantity: number, operation: OperationsUpdateProduct) {
    try {
      const produto = await this.findById(produtoId);

      if(!produto) {
        throw new NotFoundException('Produto não encontrado!')
      }

      if(operation == 'DECREMENT') {
        if(produto.quantity - quantity < 0) {
          throw new ForbiddenException('A quantidade de produtos não pode ser menor que zero!')
        }

        await this.prisma.produto.update({
          data: {
            quantity: {
              decrement: quantity
            }
          },
          where: {
            id: produtoId
          }
        })
      } else if (operation == 'INCREMENT') {
        await this.prisma.produto.update({
          data: {
            quantity: {
              increment: quantity
            }
          },
          where: {
            id: produtoId
          }
        })
      } else {
        throw new ForbiddenException('Essa operação não existe!')
      }

      return {
        message: 'Sucesso!'
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(produtoId: string) {
    try {
      const produto = await this.findById(produtoId);

      if (!produto) {
        throw new NotFoundException('Produto não encontrado(a)!')
      }

      return await this.prisma.produto.delete({
        where: {
          id: produtoId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createHistoricoProduct(
    produtoId: string,
    almoxarifeId: string,
    actionProdutoDto: ActionProdutoDto,
  ) {
    try {
      const produto = await this.findById(produtoId);

      if (!produto) {
        throw new NotFoundException('Produto não encontrado(a)!')
      }

      const almoxarife = await this.almoxarifeService.findById(almoxarifeId);

      if (!almoxarife) {
        throw new NotFoundException('Produto não encontrado(a)!')
      }

      return await this.prisma.historicoProduto.create({
        data: {
          ...actionProdutoDto,
          produtoId,
          almoxarifeId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
