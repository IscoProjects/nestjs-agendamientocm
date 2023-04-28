import { IsDateString, IsString, IsUUID } from 'class-validator';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

export class CreateAgendamientoDto {
  @IsString()
  @IsUUID()
  usuario: Usuario;

  @IsString()
  @IsUUID()
  paciente: Paciente;

  @IsString()
  tipo_agenda: string;

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

  @IsString()
  appointment_status: string;
}
