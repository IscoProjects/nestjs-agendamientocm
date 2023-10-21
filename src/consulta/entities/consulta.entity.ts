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
  @PrimaryGeneratedColumn('uuid')
  id_consulta: string;

  @OneToOne(() => Agendamiento, (agendamiento) => agendamiento.consulta, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  agendamiento: Agendamiento;

  @Column({
    type: 'text',
    nullable: false,
  })
  med_responsable: string;

  @Column({
    type: 'date',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha: Date;

  @Column({
    type: 'time without time zone',
    nullable: false,
  })
  hora_inicio: Date;

  @Column({
    type: 'time without time zone',
    nullable: false,
  })
  hora_fin: Date;

  @Column({
    type: 'time without time zone',
    nullable: false,
  })
  tiempo_consulta: Date;

  @Column({
    type: 'integer',
    nullable: false,
  })
  tiempo_espera: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  observaciones: string;
}
