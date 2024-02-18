import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { CreateRequisicaoDto } from './dto/requisicao.dto';
import { ProdutoService } from 'src/produto/produto.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusRequisicao } from '@prisma/client';
import { OperationsUpdateProduct } from 'src/produto/dto/produto.dto';

@Injectable()
export class RequisicaoService {
  constructor(
    private prisma: PrismaService,
    private usuarioService: UsuarioService,
    private produtoService: ProdutoService
  ) {}

  async create(
    usuarioId: string,
    createRequisicaoDto: CreateRequisicaoDto,
  ) {
    try {
      const usuario = await this.usuarioService.findById(usuarioId);

      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado(a)!');
      }

      const produto = await this.produtoService.findById(
        createRequisicaoDto.produtoId,
      );

      if (!produto) {
        throw new NotFoundException('Produto não encontrado(a)!');
      }

      return await this.prisma.requisicao.create({
        data: {
          ...createRequisicaoDto,
          creatorId: usuarioId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(requisicaoId: string) {
    try {
      return await this.prisma.requisicao.findUnique({
        where: {
          id: requisicaoId
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async findMany() {
    try {
      return await this.prisma.requisicao.findMany()
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(usuarioId: string) {
    try {
      return await this.prisma.requisicao.findMany({
        where: {
          creatorId: usuarioId
        }
      })
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(requisicaoId: string, usuarioId: string, status: StatusRequisicao) {
    try {
      const requisicao = await this.findById(requisicaoId)

      if(requisicao.status == status) {
        throw new ForbiddenException('O status não mudou!')
      }

      if(!requisicao) {
        throw new NotFoundException('Requisicao não encontrado(a)!')
      }

      const usuario = await this.usuarioService.findById(usuarioId)

      if(!usuario) {
        throw new NotFoundException('Usuário não encontrado(a)!')
      }

      if(requisicao.status == 'APROVADO') {
        await this.produtoService.updateQuantity(requisicao.produtoId, requisicao.quantity, OperationsUpdateProduct.INCREMENT)
      }

      if(status == 'APROVADO') {
        await this.produtoService.updateQuantity(requisicao.produtoId, requisicao.quantity, OperationsUpdateProduct.DECREMENT)
      }

      return await this.prisma.requisicao.update({
        data: {
          status
        },
        where: {
          id: requisicaoId
        }
      })
    } catch (error) { 
      throw error;
    }
  }
}
