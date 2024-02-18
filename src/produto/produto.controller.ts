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
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @ApiBearerAuth('Auth')
  @Post()
  @Roles(Role.ADMIN, Role.ALMOXARIFE)
  async create(
    @Body() createProdutoDto: CreateProdutoDto,
    @Request() req: any,
  ) {
    try {
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
  @Roles(Role.ADMIN, Role.ALMOXARIFE)
  async update(@Request() req: any, @Body() data: UpdateProdutoDto, @Param('id') produtoId: string) {
    try {
      return await this.produtoService.update(produtoId, data)
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Delete(':id')
  @Roles(Role.ADMIN, Role.ALMOXARIFE)
  async delete(@Request() req: any, @Param('id') produtoId: string) {
    try {
      return await this.produtoService.delete(produtoId)
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Patch(':id/action')
  @Roles(Role.ADMIN, Role.ALMOXARIFE)
  async actionProduct(
    @Param('id') productId: string,
    @Request() req: any,
    @Body() actionProductDto: ActionProdutoDto,
  ) {
    try {
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
