import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { Polivalente } from '../../polivalente/entities/polivalente.entity';
import { ManyToOne } from 'typeorm';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UnmetDemand } from 'src/unmet_demand/entities/unmet_demand.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @ManyToOne(() => Polivalente, (polivalente) => polivalente.usuario, {
    onDelete: 'CASCADE',
  })
  polivalente: Polivalente;

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
  us_telefono: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  us_fecha_nac: Date;

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

  @OneToMany(() => UnmetDemand, (unmet_demand) => unmet_demand.usuario, {
    nullable: false,
    cascade: true,
  })
  unmet_demand: UnmetDemand;

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
