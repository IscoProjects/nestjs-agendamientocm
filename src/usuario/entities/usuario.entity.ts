import { ApiProperty } from '@nestjs/swagger';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { EstacionTrabajo } from 'src/estacion-trabajo/entities/estacion-trabajo.entity';
import { ManyToOne } from 'typeorm';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Usuario {
  @ApiProperty({
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
    description: 'Professional ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @ApiProperty({
    example: '7b7d6cbe-20e6-403b-b7fa-01bb92625f50',
    description: 'Related Workstation ID',
    uniqueItems: true,
  })
  @ManyToOne(() => EstacionTrabajo, (estacion) => estacion.usuario, {
    onDelete: 'CASCADE',
  })
  estacion_trabajo: EstacionTrabajo;

  @ApiProperty({
    example: '0506070809',
    description: 'Professional CI',
    uniqueItems: true,
  })
  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  us_cedula: string;

  @ApiProperty({
    example: 'Luis José',
    description: 'Professional Name',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  us_nombres: string;

  @ApiProperty({
    example: 'Paz Paz',
    description: 'Professional Last Name',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  us_apellidos: string;

  @ApiProperty({
    example: 'true',
    description: 'Professional Status',
  })
  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  us_isActive: boolean;

  @ApiProperty({
    example: 'Medico General',
    description: 'Professional Career',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  us_carrera: string;

  @ApiProperty({
    example: '0988888888',
    description: 'Professional Phone',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  us_telefono: string;

  @ApiProperty({
    example: '1985-12-12',
    description: 'Professional Date of birth',
  })
  @Column({
    type: 'date',
    nullable: false,
  })
  us_fecha_nac: Date;

  @ApiProperty({
    example: 'Masculino',
    description: 'Professional Genre',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  us_sexo: string;

  @ApiProperty({
    example: 'medico1',
    description: 'Professional User',
  })
  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  us_user: string;

  @Column({
    type: 'text',
    nullable: false,
    select: false,
  })
  us_password: string;

  @ApiProperty({
    example: 'Medico',
    description: 'Professional Rol',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  us_role: string;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.usuario, {
    nullable: false,
    cascade: true,
  })
  agendamiento: Agendamiento;

  @BeforeInsert()
  checkCIInsert() {
    this.us_cedula = this.us_cedula.replaceAll(' ', '');
  }

  @BeforeUpdate()
  checkCIUpadate() {
    this.us_cedula = this.us_cedula.replaceAll(' ', '');
  }

  @BeforeInsert()
  checkUserInsert() {
    this.us_user = this.us_user.replaceAll(' ', '');
  }

  @BeforeUpdate()
  checkUserUpadate() {
    this.us_user = this.us_user.replaceAll(' ', '');
  }
}
