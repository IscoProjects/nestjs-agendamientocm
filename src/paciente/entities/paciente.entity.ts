import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn('uuid')
  id_paciente: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  pac_cedula: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  pac_nombre: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  pac_apellido: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  pac_sexo: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  pac_fecha_nac: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  pac_telefono: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  pac_provincia: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  pac_canton: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  pac_direccion: string;

  @Column({
    type: 'text',
    array: true,
  })
  pac_gprioritario: string[];

  @Column({
    type: 'text',
    nullable: false,
  })
  pac_ref_person: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  pac_ref_parentesco: string;

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
