import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Seccion } from '../../seccion/entities/seccion.entity';
export class CreatePolivalenteDto {
  @IsString()
  @IsUUID()
  seccion: Seccion;

  @IsString()
  pol_descripcion: string;

  @IsBoolean()
  isAvailible: boolean;
}
