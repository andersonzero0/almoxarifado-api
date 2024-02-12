import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { CreateFornecedorDto } from './dto/fornecedor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('fornecedor')
@Controller('fornecedor')
export class FornecedorController {
  constructor(private fornecedorService: FornecedorService) {}

  @ApiBearerAuth('Auth')
  @Post()
  async create(
    @Body() createFornecedorDto: CreateFornecedorDto,
    @Request() req: any,
  ) {
    try {
      if (req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizado!');
      }
      return await this.fornecedorService.create(
        createFornecedorDto,
        req.user.id,
      );
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get()
  async findMany() {
    try {
      return await this.fornecedorService.findMany();
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get(':id')
  async findById(@Param('id') fornecedorId: string) {
    try {
      const fornecedor = await this.fornecedorService.findById(fornecedorId);

      if (!fornecedor) {
        throw new NotFoundException('Fornecedor não encontrado(a)!')
      }

      return fornecedor;
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Put(':id')
  async update(@Request() req: any, @Body() data: CreateFornecedorDto, @Param('id') fornecedorId: string) {
    try {
      if(req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizado!')
      }

      return await this.fornecedorService.update(fornecedorId, data)
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Delete(':id')
  async delete(@Request() req: any, @Param('id') fornecedorId: string) {
    try {
      if(req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizado!')
      }

      return await this.fornecedorService.delete(fornecedorId)
    } catch (error) {
      throw error;
    }
  }
}
