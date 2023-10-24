import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Paciente {
  @ApiProperty({
    example: 'ebe66d23-e4ab-4f31-a410-e60223c2f27f',
    description: 'Patient ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id_paciente: string;

  @ApiProperty({
    example: '0605040302',
    description: 'Patient CI',
    uniqueItems: true,
  })
  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  pac_cedula: string;

  @ApiProperty({
    example: 'Juan Pablo',
    description: 'Patient Name',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  pac_nombre: string;

  @ApiProperty({
    example: 'Neruda Neruda',
    description: 'Patient Last Name',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  pac_apellido: string;

  @ApiProperty({
    example: 'Masculino',
    description: 'Patient Genre',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  pac_sexo: string;

  @ApiProperty({
    example: '1990-10-10',
    description: 'Patient Date of birth',
  })
  @Column({
    type: 'date',
    nullable: false,
  })
  pac_fecha_nac: Date;

  @ApiProperty({
    example: '0987654321',
    description: 'Patient Phone',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  pac_telefono: string;

  @ApiProperty({
    example: 'Chimborazo',
    description: 'Patient Province',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  pac_provincia: string;

  @ApiProperty({
    example: 'Chambo',
    description: 'Patient Canton',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  pac_canton: string;

  @ApiProperty({
    example: 'Av. Principal',
    description: 'Patient Address',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  pac_direccion: string;

  @ApiProperty({
    example: '[Adulto mayor]',
    description: 'Patient Priority Group',
  })
  @Column({
    type: 'text',
    array: true,
  })
  pac_gprioritario: string[];

  @ApiProperty({
    example: 'Pedro Hernandez',
    description: 'Patient Reference Person',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  pac_ref_person: string;

  @ApiProperty({
    example: 'Hermano',
    description: 'Patient Reference Person Relationship',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  pac_ref_parentesco: string;

  @ApiProperty({
    example: '0999999999',
    description: 'Patient Reference Person Phone',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  pac_ref_telefono: string;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.paciente, {
    nullable: false,
    cascade: true,
  })
  agendamiento: Agendamiento;

  @BeforeInsert()
  checkCIInsert() {
    this.pac_cedula = this.pac_cedula.replaceAll(' ', '');
  }

  @BeforeUpdate()
  checkCIUpadate() {
    this.pac_cedula = this.pac_cedula.replaceAll(' ', '');
  }
}
