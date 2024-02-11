import { ApiProperty } from "@nestjs/swagger"
import { IsLowercase, IsNotEmpty, IsOptional, IsString, Matches, MinLength, Validate, ValidationArguments } from "class-validator"

export class CreateRequisitanteDto {
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
  @Matches(/^[^\s]*$/, {
    message: 'username should not contain spaces',
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