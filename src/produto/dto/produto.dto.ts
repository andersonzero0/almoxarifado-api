import { OmitType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  fornecedorId: string

  @IsOptional()
  @IsUrl()
  @MaxLength(225)
  image_url: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(225)
  description: string;

  @IsOptional()
  @IsInt()
  quantity: number;

  @IsOptional()
  @IsInt()
  priceUnit: number;
}

export class UpdateProdutoDto extends OmitType(CreateProdutoDto, ['quantity'] as const) {}

enum Action {
  ADDED = 'ADDED',
  REMOVED = 'REMOVED'
}

export class ActionProdutoDto {
  @IsEnum(Action)
  action: Action

  @IsInt()
  quantityUpdate: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(225)
  description: string
}

export enum OperationsUpdateProduct {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}