import { IsString, IsBoolean } from 'class-validator';
export class CreateAreaTrabajoDto {
  @IsString()
  area_descripcion: string;

  @IsBoolean()
  isAvailible: boolean;
}
