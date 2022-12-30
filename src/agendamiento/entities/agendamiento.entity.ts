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
import { Polivalente } from 'src/polivalente/entities/polivalente.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Agendamiento {
  @PrimaryGeneratedColumn('uuid')
  id_agendamiento: string;

  @OneToOne(() => Consulta, (consulta) => consulta.agendamiento, {
    onDelete: 'CASCADE',
  })
  consulta: Consulta;

  @ManyToOne(() => Usuario, (usuario) => usuario.agendamiento, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

  @ManyToOne(() => Paciente, (paciente) => paciente.agendamiento, {
    onDelete: 'CASCADE',
  })
  paciente: Paciente;

  @ManyToOne(() => Polivalente, (polivalente) => polivalente.agendamiento, {
    onDelete: 'CASCADE',
  })
  polivalente: Polivalente;

  @Column({
    type: 'integer',
    nullable: false,
    generatedIdentity: 'BY DEFAULT',
  })
  @Generated('increment')
  nro_agendamiento: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  tipo_agendamiento: string;

  @Column({
    type: 'timestamp without time zone',
    nullable: false,
    default: () => 'NOW()',
  })
  fecha_agendamiento: Date;

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
}
