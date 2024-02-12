import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RequisicaoService } from './requisicao.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateRequisicaoDto,
  UpdateStatusRequisicaoDto,
} from './dto/requisicao.dto';

@ApiTags('requisicao')
@Controller('requisicao')
export class RequisicaoController {
  constructor(private requisicaoService: RequisicaoService) {}

  @ApiBearerAuth('Auth')
  @Post()
  async create(@Request() req: any, @Body() data: CreateRequisicaoDto) {
    try {
      if (req.user.typeUser != 'requisitante') {
        throw new UnauthorizedException('Seu usuário não está autorizado!');
      }

      return await this.requisicaoService.create(req.user.id, data);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get()
  async findMany() {
    try {
      return await this.requisicaoService.findMany()
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @Patch(':id/status/:status')
  async updateStatus(
    @Param() data: UpdateStatusRequisicaoDto,
    @Request() req: any,
  ) {
    try {
      if (req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizado!');
      }

      return await this.requisicaoService.updateStatus(
        data.id,
        req.user.id,
        data.status,
      );
    } catch (error) {
      throw error;
    }
  }
}
