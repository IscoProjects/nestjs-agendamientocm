import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Agendamiento } from 'src/agendamiento/entities/agendamiento.entity';

@Entity()
export class Polivalente {
  @PrimaryGeneratedColumn('uuid')
  id_polivalente: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: false,
  })
  nro_polivalente: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  area_polivalente: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isAvailible: boolean;

  @OneToMany(() => Agendamiento, (agendamiento) => agendamiento.polivalente, {
    nullable: false,
    cascade: true,
  })
  agendamiento: Agendamiento;
}
