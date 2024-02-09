import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlmoxarifeDto, FindAlmoxarifeDto } from './dto/almoxarife.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AlmoxarifeService {
  constructor(private prisma: PrismaService) {}

  async createAlmoxarife(almoxarifeData: CreateAlmoxarifeDto) {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(almoxarifeData.password, salt);

      return await this.prisma.almoxarife.create({
        data: { ...almoxarifeData, password: hash },
        select: {
          name: true,
          username: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAlmoxarife(findAlmoxarifeDto: FindAlmoxarifeDto) {
    try {
      const almoxarife = await this.prisma.almoxarife.findUnique({
        where: findAlmoxarifeDto
      });

      if (!almoxarife) {
        throw new NotFoundException();
      }

      return almoxarife;
    } catch (error) {
      throw error;
    }
  }
}
