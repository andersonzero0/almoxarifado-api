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
  @Post(':typeUser')
  async auth(@Body() authDto: AuthDto, @Param('typeUser') typeUser: string) {
    try {
      return await this.authService.auth(authDto, typeUser);
    } catch (error) {
      throw error;
    }
  }
}
