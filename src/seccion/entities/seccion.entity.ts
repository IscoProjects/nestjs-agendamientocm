import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from 'src/area/entities/area.entity';
import { EstacionTrabajo } from 'src/estacion-trabajo/entities/estacion-trabajo.entity';

@Entity()
export class Seccion {
  @PrimaryGeneratedColumn('uuid')
  id_seccion: string;

  @ManyToOne(() => Area, (area) => area.seccion, {
    onDelete: 'CASCADE',
  })
  area: Area;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  descripcion: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isAvailible: boolean;

  @OneToMany(() => EstacionTrabajo, (estacion) => estacion.seccion, {
    nullable: false,
    cascade: true,
  })
  estacion_trabajo: EstacionTrabajo;
}
