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
  tipo_agenda: string;

  @IsString()
  estado_agenda: string;

  @IsDateString()
  fecha_consulta: string;

  @IsString()
  hora_consulta: Date;

  @IsString()
  observaciones: string;

  @IsBoolean()
  pac_asistencia: boolean;

  @IsString()
  @IsUUID()
  agendado_por: string;
}
