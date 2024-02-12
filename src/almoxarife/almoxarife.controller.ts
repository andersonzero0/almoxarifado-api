import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AlmoxarifeService } from './almoxarife.service';
import { CreateAlmoxarifeDto, UpdateAlmoxarifeDto } from './dto/almoxarife.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';

@ApiTags('almoxarife')
@Controller('almoxarife')
export class AlmoxarifeController {
  constructor(private almoxarifeService: AlmoxarifeService) {}

  @Public()
  @Post()
  async create(@Body() createAlmoxarifeDto: CreateAlmoxarifeDto) {
    try {
      return await this.almoxarifeService.create(createAlmoxarifeDto);
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get()
  async findMany() {
    try {
      return await this.almoxarifeService.findMany();
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Get(':id')
  async findById(@Param('id') almoxarifeId: string) {
    try {
      const almoxarife = await this.almoxarifeService.findById(almoxarifeId);

      if (!almoxarife) {
        throw new NotFoundException('Almoxarife não encontrado(a)!')
      }

      delete almoxarife.password;

      return almoxarife;
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('Auth')
  @Put()
  async update(@Request() req: any, @Body() data: UpdateAlmoxarifeDto) {
    try {
      if (req.user.typeUser != 'almoxarife') {
        throw new UnauthorizedException('Seu usuário não está autorizaodo!');
      }

      return await this.almoxarifeService.update(req.user.id, data);
    } catch (error) {
      throw error;
    }
  }
}
