import { ApiProperty } from '@nestjs/swagger';
import { IsLowercase, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty()
  @IsString()
  @Matches(/^[^\s]*$/, {
    message: 'username should not contain spaces',
  })
  @IsLowercase()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
