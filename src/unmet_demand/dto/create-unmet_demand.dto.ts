import { IsDateString, IsString, IsUUID } from 'class-validator';
import { Paciente } from 'src/paciente/entities/paciente.entity';

export class CreateUnmetDemandDto {
  @IsString()
  @IsUUID()
  paciente: Paciente;

  @IsString()
  tipo_asercion: string;

  @IsString()
  area_agenda: string;

  @IsString()
  seccion_agenda: string;

  @IsString()
  pol_agenda: string;

  @IsDateString()
  fecha_consulta: Date;

  @IsString()
  hora_consulta: Date;

  @IsString()
  observaciones: string;
}
