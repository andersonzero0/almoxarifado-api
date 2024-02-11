import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateFornecedorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  tax_id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  corporateReason: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  agent: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bank: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  agency: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  account: string;
}
