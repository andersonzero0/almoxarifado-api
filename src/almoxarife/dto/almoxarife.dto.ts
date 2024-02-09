import { ApiProperty } from "@nestjs/swagger"
import { IsLowercase, IsNotEmpty, IsOptional, IsString, MinLength, Validate, ValidationArguments } from "class-validator"

export class CreateAlmoxarifeDto {
  @ApiProperty({
    description: 'Nome do almoxarife.',
    example: 'João'
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Nome de usuário que será usado para ser efectudado o login.',
    example: 'joao123'
  })
  @IsString()
  @IsLowercase()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    description: 'Senha',
    example: 'senha123'
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string
}

class IsEitherIdOrUsername {
  validate(args: ValidationArguments) {
    const { id, username } = args.object as FindAlmoxarifeDto;
    if (id && username) return false;
    if (!id && !username) return false;
    return true;
  }

  defaultMessage() {
    return 'Either id or username must be provided, but not both.';
  }
}

export class FindAlmoxarifeDto {
  @ApiProperty()
  @IsOptional()
  @Validate(IsEitherIdOrUsername)
  @IsString()
  @IsNotEmpty()
  id: string

  @ApiProperty()
  @IsOptional()
  @Validate(IsEitherIdOrUsername)
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  username: string
}