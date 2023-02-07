import { AreaTrabajo } from 'src/area_trabajo/entities/area_trabajo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Polivalente } from '../../polivalente/entities/polivalente.entity';

@Entity()
export class Seccion {
  @PrimaryGeneratedColumn('uuid')
  id_seccion: string;

  @ManyToOne(() => AreaTrabajo, (area_trabajo) => area_trabajo.seccion, {
    onDelete: 'CASCADE',
  })
  area_trabajo: AreaTrabajo;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  seccion_descripcion: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isAvailible: boolean;

  @OneToMany(() => Polivalente, (polivalente) => polivalente.seccion, {
    nullable: false,
    cascade: true,
  })
  polivalente: Polivalente;
}
