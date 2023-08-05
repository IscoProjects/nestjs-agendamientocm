import { Seccion } from 'src/seccion/entities/seccion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EstacionTrabajo {
  @PrimaryGeneratedColumn('uuid')
  id_estacion: string;

  @ManyToOne(() => Seccion, (seccion) => seccion.estacion_trabajo, {
    onDelete: 'CASCADE',
  })
  seccion: Seccion;

  @Column({
    type: 'text',
    nullable: false,
  })
  descripcion: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isAvailible: boolean;

  @OneToMany(() => Usuario, (usuario) => usuario.estacion_trabajo, {
    nullable: false,
    cascade: true,
  })
  usuario: Usuario;
}
