import { ApiProperty } from '@nestjs/swagger';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Consulta {
  @ApiProperty({
    example: '44cb3359-270a-483b-8011-23bc75b0b2de',
    description: 'Medical Appointment ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id_consulta: string;

  @OneToOne(() => Agendamiento, (agendamiento) => agendamiento.consulta, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  agendamiento: Agendamiento;

  @ApiProperty({
    example: '4b720a22-5e2a-40d8-8ad7-299b7d570967',
    description: 'Professional ID',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  med_responsable: string;

  @ApiProperty({
    example: '2023-10-25',
    description: 'Medical Appointment Date',
  })
  @Column({
    type: 'date',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha: Date;

  @ApiProperty({
    example: '10:00:00',
    description: 'Medical Appointment Start Time',
  })
  @Column({
    type: 'time without time zone',
    nullable: false,
  })
  hora_registro: Date;

  @ApiProperty({
    example: '30',
    description: 'Medical Appointment Waiting Time',
  })
  @Column({
    type: 'integer',
    nullable: false,
  })
  tiempo_espera: number;

  @ApiProperty({
    example: 'Interconsulta',
    description: 'Medical Appointment Observations',
    nullable: true,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  observaciones: string;
}
