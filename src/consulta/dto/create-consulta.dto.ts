import { IsDateString, IsString, IsUUID } from 'class-validator';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';

export class CreateConsultaDto {
  @IsString()
  @IsUUID()
  agendamiento: Agendamiento;

  @IsString()
  @IsUUID()
  med_responsable: string;

  @IsDateString()
  fecha: Date;

  @IsString()
  hora_inicio: Date;

  @IsString()
  hora_fin: Date;

  @IsString()
  tiempo_consulta: Date;

  @IsString()
  tiempo_espera: Date;

  @IsString()
  observaciones: string;
}
