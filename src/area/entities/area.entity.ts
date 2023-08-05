import { Seccion } from 'src/seccion/entities/seccion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id_area: string;

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

  @OneToMany(() => Seccion, (seccion) => seccion.area, {
    nullable: false,
    cascade: true,
  })
  seccion: Seccion;
}
