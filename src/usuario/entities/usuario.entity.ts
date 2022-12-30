import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
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
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  us_cedula: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  us_nombres: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  us_apellidos: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  us_isActive: boolean;

  @Column({
    type: 'text',
    nullable: false,
  })
  us_carrera: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  us_strabajo: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  us_telefono: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  us_fecha_nac: Date;

  @Column({
    type: 'text',
    nullable: false,
  })
  us_role: string;

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

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.usuario, {
    nullable: false,
    cascade: true,
  })
  agendamiento: Agendamiento;

  @BeforeInsert()
  checkCIInsert() {
    // if (!this.us_cedula) {
    //   this.us_cedula = this.us_nombre;
    // }
    this.us_cedula = this.us_cedula.replaceAll(' ', '');
  }

  @BeforeUpdate()
  checkCIUpadate() {
    this.us_cedula = this.us_cedula.replaceAll(' ', '');
  }
}
