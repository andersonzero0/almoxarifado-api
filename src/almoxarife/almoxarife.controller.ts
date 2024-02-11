import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AlmoxarifeService } from './almoxarife.service';
import { CreateAlmoxarifeDto } from './dto/almoxarife.dto';
import { ApiTags } from '@nestjs/swagger';
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

  @Get()
  async findMany() {
    try {
      return await this.almoxarifeService.findMany()
    } catch (error) {
      throw error;
    }
  }
}
