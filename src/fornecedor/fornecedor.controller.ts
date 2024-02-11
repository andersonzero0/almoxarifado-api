import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/fornecedor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('fornecedor')
@Controller('fornecedor')
export class FornecedorController {
  constructor(private fornecedorService: FornecedorService) {}

  @Post()
  async create(@Body() createFornecedorDto: CreateFornecedorDto, @Request() req: any) {
    try {
        if(req.user.typeUser != 'almoxarife') {
            throw new UnauthorizedException()
        }
        return await this.fornecedorService.create(createFornecedorDto, req.user.id)
    } catch (error) {
        throw error;
    }
  }

  @Get()
  async findMany() {
    try {
        return await this.fornecedorService.findMany()
    } catch (error) {
        throw error
    }
  }
}
