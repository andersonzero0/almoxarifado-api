import { IsEnum, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export enum StatusRequisicao {
  PENDENTE = 'PENDENTE',
  APROVADO = 'APROVADO',
  NEGADO = 'NEGADO',
}

export class CreateRequisicaoDto {
  @IsInt()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(225)
  description: string;

  @IsString()
  @IsNotEmpty()
  produtoId: string;
}

export class UpdateStatusRequisicaoDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsEnum(StatusRequisicao)
  status: StatusRequisicao
}
