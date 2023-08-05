import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Seccion } from 'src/seccion/entities/seccion.entity';

export class CreateEstacionTrabajoDto {
  @IsString()
  @IsUUID()
  seccion: Seccion;

  @IsString()
  descripcion: string;

  @IsBoolean()
  isAvailible: boolean;
}
