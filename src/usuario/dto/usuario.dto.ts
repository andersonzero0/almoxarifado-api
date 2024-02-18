import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsLowercase, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate, ValidationArguments } from "class-validator"
import { Role } from "src/roles/roles.enum"

export class CreateUsuarioDto {
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
  @IsNotEmpty()
  @Matches(/^[^\s]*$/, {
    message: 'username should not contain spaces',
  })
  @IsString()
  @IsLowercase()
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

  @IsEnum(Role)
  role: Role
}

export class UpdateUsuarioDto extends CreateUsuarioDto {
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