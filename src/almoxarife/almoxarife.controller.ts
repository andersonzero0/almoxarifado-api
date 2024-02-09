import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AlmoxarifeService } from './almoxarife.service';
import { CreateAlmoxarifeDto, FindAlmoxarifeDto } from './dto/almoxarife.dto';

@Controller('almoxarife')
export class AlmoxarifeController {
  constructor(private almoxarifeService: AlmoxarifeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createAlmoxarife(@Body() createAlmoxarifeDto: CreateAlmoxarifeDto) {
    try {
      return await this.almoxarifeService.createAlmoxarife(createAlmoxarifeDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async findAlmoxarife(@Query() findAlmoxarifeDto: FindAlmoxarifeDto) {
    try {
      return await this.almoxarifeService.findAlmoxarife(findAlmoxarifeDto)
    } catch (error) {
      throw error;
    }
  }
}
