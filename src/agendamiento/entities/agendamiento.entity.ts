import {
  Generated,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Consulta } from 'src/consulta/entities/consulta.entity';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Agendamiento {
  @ApiProperty({
    example: '44cb3359-270a-483b-8011-23bc75b0b2de',
    description: 'Scheduling ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id_agendamiento: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.agendamiento, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ApiProperty({
    example: 'ebe66d23-e4ab-4f31-a410-e60223c2f27f',
    description: 'Related Patient ID',
    uniqueItems: true,
  })
  @ManyToOne(() => Paciente, (paciente) => paciente.agendamiento, {
    onDelete: 'CASCADE',
  })
  paciente: Paciente;

  @ApiProperty({
    example: 'null',
    description: 'Related Medical Appointment ID',
    uniqueItems: true,
  })
  @OneToOne(() => Consulta, (consulta) => consulta.agendamiento, {
    onDelete: 'CASCADE',
  })
  consulta: Consulta;

  @ApiProperty({
    example: '1',
    description: 'Scheduling number',
    uniqueItems: true,
  })
  @Column({
    type: 'integer',
    nullable: false,
    generatedIdentity: 'BY DEFAULT',
  })
  @Generated('increment')
  nro_agenda: number;

  @ApiProperty({
    example: 'Call Center',
    description: 'Scheduling channel',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  canal_agenda: string;

  @ApiProperty({
    example: 'Interconsulta',
    description: 'Scheduling detail',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  detalle_agenda: string;

  @ApiProperty({
    example: '2023-10-21T22:38:37.882Z',
    description: 'Scheduling date',
    default: 'Creation date',
  })
  @Column({
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha_agenda: Date;

  @ApiProperty({
    example: '2023-10-25',
    description: 'Appointment date',
  })
  @Column({
    type: 'date',
    nullable: false,
  })
  fecha_consulta: string;

  @ApiProperty({
    example: '12:00:00',
    description: 'Appointment time',
  })
  @Column({
    type: 'time without time zone',
    nullable: false,
  })
  hora_consulta: Date;

  @ApiProperty({
    example: '30',
    description: 'Approximate Time of Duration',
  })
  @Column({
    type: 'integer',
    nullable: false,
  })
  duracion_consulta: number;

  @ApiProperty({
    example: 'true',
    description: 'Scheduling status',
    default: false,
  })
  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  estado_agenda: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Scheduling assistance',
    default: false,
  })
  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  pac_asistencia: boolean;

  @ApiProperty({
    example: 'Ninguno',
    description: 'Patient affiliation',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  pac_afiliacion: string;

  @ApiProperty({
    example: 'Paciente en estado crítico',
    description: 'Scheduling comments',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  observaciones: string;

  @ApiProperty({
    example: '86f94cc6-5a01-47ca-acf7-fb3172f382d3',
    description: 'Scheduling ID user',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  agendado_por: string;
}
