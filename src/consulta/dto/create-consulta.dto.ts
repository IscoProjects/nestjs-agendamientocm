import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';

export class CreateConsultaDto {
  @ApiProperty({
    description: 'Related Scheduling ID (unique)',
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsUUID()
  agendamiento: Agendamiento;

  @ApiProperty({
    description: 'Profesional ID (unique)',
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsUUID()
  med_responsable: string;

  @ApiProperty({
    description: 'Date',
    nullable: false,
    type: 'string',
  })
  @IsDateString()
  fecha: Date;

  @ApiProperty({
    description: 'Start time',
    nullable: false,
    type: 'string',
  })
  @IsString()
  hora_registro: Date;

  @ApiProperty({
    description: 'Waiting time',
    nullable: false,
  })
  @IsNumber()
  tiempo_espera: number;

  @ApiProperty({
    description: 'Observations',
    nullable: true,
  })
  @IsString()
  observaciones: string;
}
