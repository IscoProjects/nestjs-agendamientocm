import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';
import { UnmetDemand } from '../../unmet_demand/entities/unmet_demand.entity';

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
    nullable: false,
  })
  pac_telefono: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  pac_gprioritario: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  pac_afiliacion: string;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.paciente, {
    nullable: false,
    cascade: true,
  })
  agendamiento: Agendamiento;

  @OneToMany(() => UnmetDemand, (unmet_demand) => unmet_demand.paciente, {
    nullable: false,
    cascade: true,
  })
  unmet_demand: UnmetDemand;

  @BeforeInsert()
  checkCIInsert() {
    // if (!this.pac_cedula) {
    //   this.pac_cedula = pac.med_nombre;
    // }
    this.pac_cedula = this.pac_cedula.replaceAll(' ', '');
  }

  @BeforeUpdate()
  checkCIUpadate() {
    this.pac_cedula = this.pac_cedula.replaceAll(' ', '');
  }
}
