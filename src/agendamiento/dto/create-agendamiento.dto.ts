import { IsBoolean, IsDateString, IsString, IsUUID } from 'class-validator';
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
  canal_agenda: string;

  @IsString()
  detalle_agenda: string;

  @IsDateString()
  fecha_consulta: string;

  @IsString()
  hora_consulta: Date;

  @IsBoolean()
  estado_agenda: boolean;

  @IsBoolean()
  pac_asistencia: boolean;

  @IsString()
  pac_afiliacion: string;

  @IsString()
  observaciones: string;

  @IsString()
  @IsUUID()
  agendado_por: string;
}
