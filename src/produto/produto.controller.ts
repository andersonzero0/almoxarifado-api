import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { ActionProdutoDto, CreateProdutoDto, UpdateProdutoDto } from './dto/produto.dto';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @ApiBearerAuth('Auth')
  @Post()
  async create(
    @Body() createProdutoDto: CreateProdutoDto,
    @Request() req: any,
  ) {
    try {
      if (req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizado!');
      }
      return await this.produtoService.create(createProdutoDto, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get()
  async findMany() {
    try {
      return await this.produtoService.findMany();
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get(':id')
  async findById(@Param('id') produtoId: string) {
    try {
      const produto = await this.produtoService.findById(produtoId);

      if (!produto) {
        throw new NotFoundException('Produto não encontrado(a)!')
      }

      return produto;
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Put(':id')
  async update(@Request() req: any, @Body() data: UpdateProdutoDto, @Param('id') produtoId: string) {
    try {
      if(req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizado!')
      }

      return await this.produtoService.update(produtoId, data)
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Delete(':id')
  async delete(@Request() req: any, @Param('id') produtoId: string) {
    try {
      if(req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizado!')
      }

      return await this.produtoService.delete(produtoId)
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Patch(':id/action')
  async actionProduct(
    @Param('id') productId: string,
    @Request() req: any,
    @Body() actionProductDto: ActionProdutoDto,
  ) {
    try {
      if (req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizado!');
      }

      return await this.produtoService.createHistoricoProduct(
        productId,
        req.user.id,
        actionProductDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
