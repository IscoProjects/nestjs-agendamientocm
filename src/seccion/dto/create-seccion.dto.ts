import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { AreaTrabajo } from '../../area_trabajo/entities/area_trabajo.entity';

export class CreateSeccionDto {
  @IsString()
  @IsUUID()
  area_trabajo: AreaTrabajo;

  @IsString()
  seccion_descripcion: string;

  @IsBoolean()
  isAvailible: boolean;
}
