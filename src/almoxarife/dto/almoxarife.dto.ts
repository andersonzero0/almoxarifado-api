import { ApiProperty } from "@nestjs/swagger"
import { IsLowercase, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, Validate, ValidationArguments } from "class-validator"

export class CreateAlmoxarifeDto {
  @ApiProperty({
    description: 'Nome do almoxarife.',
    example: 'João'
  })
  @MaxLength(24)
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Nome de usuário que será usado para ser efectudado o login.',
    example: 'joao123'
  })
  @Matches(/^[^\s]*$/, {
    message: 'username should not contain spaces',
  })
  @IsString()
  @IsLowercase()
  @IsNotEmpty()
  @MaxLength(20)
  username: string

  @ApiProperty({
    description: 'Senha',
    example: 'senha123'
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  password: string
}

export class UpdateAlmoxarifeDto extends CreateAlmoxarifeDto {
  @ApiProperty({
    description: 'Antiga senha',
    example: 'senha123'
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  oldPassword: string
}