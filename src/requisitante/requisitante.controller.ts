import { Body, Controller, Get, Post } from '@nestjs/common';
import { RequisitanteService } from './requisitante.service';
import { CreateRequisitanteDto } from './dto/requisitante.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';

@ApiTags('requisitante')
@Controller('requisitante')
export class RequisitanteController {
    constructor(private requisitanteService: RequisitanteService) {}

  @Public()
  @Post()
  async create(@Body() createRequisitanteDto: CreateRequisitanteDto) {
    try {
      return await this.requisitanteService.create(createRequisitanteDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findMany() {
    try {
      return await this.requisitanteService.findMany()
    } catch (error) {
      throw error;
    }
  }
}
