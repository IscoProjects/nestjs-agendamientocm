import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Area } from 'src/area/entities/area.entity';

export class CreateSeccionDto {
  @IsString()
  @IsUUID()
  area: Area;

  @IsString()
  descripcion: string;

  @IsBoolean()
  isAvailible: boolean;
}
