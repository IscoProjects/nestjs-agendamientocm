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

@Entity()
export class Agendamiento {
  @PrimaryGeneratedColumn('uuid')
  id_agenda: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.agendamiento, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ManyToOne(() => Paciente, (paciente) => paciente.agendamiento, {
    onDelete: 'CASCADE',
  })
  paciente: Paciente;

  @OneToOne(() => Consulta, (consulta) => consulta.agendamiento, {
    onDelete: 'CASCADE',
  })
  consulta: Consulta;

  @Column({
    type: 'integer',
    nullable: false,
    generatedIdentity: 'BY DEFAULT',
  })
  @Generated('increment')
  nro_agenda: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  tipo_agenda: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  area_agenda: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  seccion_agenda: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  pol_agenda: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  fecha_consulta: string;

  @Column({
    type: 'time without time zone',
    nullable: false,
  })
  hora_consulta: Date;

  @Column({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha_agenda: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  observaciones: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  appointment_status;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  patient_assistance: boolean;
}
