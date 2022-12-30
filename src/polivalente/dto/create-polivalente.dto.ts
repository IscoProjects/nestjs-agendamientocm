import { IsBoolean, IsString } from 'class-validator';

export class CreatePolivalenteDto {
  @IsString()
  nro_polivalente: string;

  @IsString()
  area_polivalente: string;

  @IsBoolean()
  isAvailible: boolean;
}
