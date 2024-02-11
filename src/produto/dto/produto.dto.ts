import { Optional } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  fornecedorId: string

  @Optional()
  @IsUrl()
  image_url: string;

  @Optional()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Optional()
  @IsInt()
  quantity: number;

  @Optional()
  @IsInt()
  priceUnit: number;
}
