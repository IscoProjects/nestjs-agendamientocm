import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '9235c3a0-dd5a-45c2-9a3d-a77ae33f1604',
    description: 'Workstation ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id_estacion: string;

  @ApiProperty({
    example: '11d3d8da-f327-4eb2-86ac-34df6c8c5476',
    description: 'Related Section ID',
    uniqueItems: true,
  })
  @ManyToOne(() => Seccion, (seccion) => seccion.estacion_trabajo, {
    onDelete: 'CASCADE',
  })
  seccion: Seccion;

  @ApiProperty({
    example: 'Polivalente 7',
    description: 'Workstation description',
    uniqueItems: true,
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  descripcion: string;

  @ApiProperty({
    example: 'true',
    description: 'Workstation status',
    default: true,
  })
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
