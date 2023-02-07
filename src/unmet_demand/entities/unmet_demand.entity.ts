import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';

@Entity()
export class UnmetDemand {
  @PrimaryGeneratedColumn('uuid')
  id_asercion: string;

  @ManyToOne(() => Paciente, (paciente) => paciente.unmet_demand, {
    onDelete: 'CASCADE',
  })
  paciente: Paciente;

  @Column({
    type: 'text',
    nullable: false,
  })
  tipo_asercion: string;

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
  fecha_consulta: Date;

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
  fecha_asercion: Date;

  @Column({
    type: 'text',
    nullable: false,
  })
  observaciones: string;
}
