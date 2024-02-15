import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAgendamientoDto {
  @ApiProperty({
    description: 'Profesional ID (unique) (medico)',
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsUUID()
  usuario: Usuario;

  @ApiProperty({
    description: 'Patient ID (unique)',
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsUUID()
  paciente: Paciente;

  @ApiProperty({
    description: 'Scheduling channel',
    nullable: false,
  })
  @IsString()
  canal_agenda: string;

  @ApiProperty({
    description: 'Scheduling type',
    nullable: false,
  })
  @IsString()
  tipo_agenda: string;

  @ApiProperty({
    description: 'Scheduling detail',
    nullable: false,
  })
  @IsString()
  detalle_agenda: string;

  @ApiProperty({
    description: 'Scheduling date',
    nullable: false,
  })
  @IsDateString()
  fecha_agenda: string;

  @ApiProperty({
    description: 'Appointment date',
    nullable: false,
  })
  @IsDateString()
  fecha_consulta: string;

  @ApiProperty({
    description: 'Appointment time',
    nullable: false,
    type: 'string',
  })
  @IsString()
  hora_consulta: Date;

  @ApiProperty({
    description: 'Appointment duration',
    nullable: false,
    type: 'integer',
  })
  @IsNumber()
  duracion_consulta: number;

  @ApiProperty({
    description: 'Scheduling status',
    nullable: false,
  })
  @IsBoolean()
  estado_agenda: boolean;

  @ApiProperty({
    description: 'Scheduling assistance',
    nullable: false,
  })
  @IsBoolean()
  pac_asistencia: boolean;

  @ApiProperty({
    description: 'Patient affiliation',
    nullable: true,
  })
  @IsString()
  pac_afiliacion: string;

  @ApiProperty({
    description: 'Scheduling comments',
    nullable: true,
  })
  @IsString()
  observaciones: string;

  @ApiProperty({
    description: 'Professional ID (unique) (agendador)',
    nullable: false,
  })
  @IsString()
  @IsUUID()
  agendado_por: string;
}
