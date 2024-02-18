import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  async auth(@Body() authDto: AuthDto) {
    try {
      return await this.authService.auth(authDto);
    } catch (error) {
      throw error;
    }
  }
}
