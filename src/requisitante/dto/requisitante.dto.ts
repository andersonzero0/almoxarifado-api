import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsLowercase, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, Validate, ValidationArguments } from "class-validator"

export class CreateRequisitanteDto {
  @ApiProperty({
    description: 'Nome do requistante.',
    example: 'João'
  })
  @IsString()
  @MaxLength(24)
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Nome de usuário que será usado para ser efectudado o login.',
    example: 'joao123'
  })
  @Matches(/^[^\s]*$/, {
    message: 'username should not contain spaces',
  })
  @MaxLength(20)
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
  @MaxLength(20)
  @IsNotEmpty()
  password: string
}

export class UpdateRequisitanteDto extends CreateRequisitanteDto {
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