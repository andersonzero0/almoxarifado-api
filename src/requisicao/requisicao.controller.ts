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
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';

@ApiTags('requisicao')
@Controller('requisicao')
export class RequisicaoController {
  constructor(private requisicaoService: RequisicaoService) {}

  @ApiBearerAuth('Auth')
  @Post()
  @Roles(Role.REQUISITANTE, Role.ADMIN)
  async create(@Request() req: any, @Body() data: CreateRequisicaoDto) {
    try {
      return await this.requisicaoService.create(req.user.id, data);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get()
  @Roles(Role.ADMIN, Role.ALMOXARIFE)
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
  @Roles(Role.ALMOXARIFE, Role.ADMIN)
  async updateStatus(
    @Param() data: UpdateStatusRequisicaoDto,
    @Request() req: any,
  ) {
    try {
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
