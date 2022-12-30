import { IsDateString, IsString, IsUUID } from 'class-validator';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Polivalente } from 'src/polivalente/entities/polivalente.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

export class CreateAgendamientoDto {
  @IsString()
  @IsUUID()
  usuario: Usuario;

  @IsString()
  @IsUUID()
  paciente: Paciente;

  @IsString()
  @IsUUID()
  polivalente: Polivalente;

  @IsString()
  tipo_agendamiento: string;

  @IsDateString()
  fecha_consulta: Date;

  @IsString()
  hora_consulta: Date;
}
