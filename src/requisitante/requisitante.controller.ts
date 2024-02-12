import { Body, Controller, Get, NotFoundException, Param, Post, Put, Request, UnauthorizedException } from '@nestjs/common';
import { RequisitanteService } from './requisitante.service';
import { CreateRequisitanteDto, UpdateRequisitanteDto } from './dto/requisitante.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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

  @ApiBearerAuth('Auth')
  @Get()
  async findMany() {
    try {
      return await this.requisitanteService.findMany()
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get(':id')
  async findById(@Param('id') requisitanteId: string) {
    try {
      const requisitante = await this.requisitanteService.findById(requisitanteId)

      if(!requisitante) {
        throw new NotFoundException('Rquisitante não encontrado(a)!')
      }

      delete requisitante.password

      return requisitante
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Put()
  async update(@Request() req: any, @Body() data: UpdateRequisitanteDto) {
    try {
      if(req.user.typeUser != 'requisitante') {
        throw new UnauthorizedException('Seu usuário não está autorizado!')
      }
      
      return await this.requisitanteService.update(req.user.id, data)
    } catch (error) {
      throw error;
    }
  }
}
