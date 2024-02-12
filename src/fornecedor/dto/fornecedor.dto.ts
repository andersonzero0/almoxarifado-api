import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class CreateFornecedorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  tax_id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(225)
  address: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10)
  cep: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(100)
  corporateReason: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(100)
  agent: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(20)
  bank: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(100)
  agency: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  @IsNotEmpty()
  account: string;
}
