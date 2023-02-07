import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seccion } from '../../seccion/entities/seccion.entity';

@Entity()
export class AreaTrabajo {
  @PrimaryGeneratedColumn('uuid')
  id_atrabajo: string;

  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  area_descripcion: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isAvailible: boolean;

  @OneToMany(() => Seccion, (seccion) => seccion.area_trabajo, {
    nullable: false,
    cascade: true,
  })
  seccion: Seccion;
}
