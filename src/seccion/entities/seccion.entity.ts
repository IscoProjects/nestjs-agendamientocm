import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from 'src/area/entities/area.entity';
import { EstacionTrabajo } from 'src/estacion-trabajo/entities/estacion-trabajo.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Seccion {
  @ApiProperty({
    example: 'dbf763d7-86c0-43d9-b335-307aacb38f5d',
    description: 'Section ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id_seccion: string;

  @ApiProperty({
    example: '53a5a939-c1f2-43b7-88bc-94a17453c4af',
    description: 'Related Area ID',
    uniqueItems: true,
  })
  @ManyToOne(() => Area, (area) => area.seccion, {
    onDelete: 'CASCADE',
  })
  area: Area;

  @ApiProperty({
    example: 'Medicina General',
    description: 'Section description',
  })
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  descripcion: string;

  @ApiProperty({
    example: 'true',
    description: 'Section status',
  })
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
