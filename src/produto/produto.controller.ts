import { Body, Controller, Post, Request, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/produto.dto';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto, @Request() req: any) {
    try {
        return await this.produtoService.create(createProdutoDto, req.user.id)
    } catch (error) {
      throw error;
    }
  }
}
