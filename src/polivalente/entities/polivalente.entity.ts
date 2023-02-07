import { Seccion } from 'src/seccion/entities/seccion.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Polivalente {
  @PrimaryGeneratedColumn('uuid')
  id_polivalente: string;

  @ManyToOne(() => Seccion, (seccion) => seccion.polivalente, {
    onDelete: 'CASCADE',
  })
  seccion: Seccion;

  @Column({
    type: 'text',
    nullable: false,
  })
  pol_descripcion: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isAvailible: boolean;

  @OneToMany(() => Usuario, (usuario) => usuario.polivalente, {
    nullable: false,
    cascade: true,
  })
  usuario: Usuario;
}
