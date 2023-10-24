import { ApiProperty } from '@nestjs/swagger';
import { Seccion } from 'src/seccion/entities/seccion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Area {
  @ApiProperty({
    example: '8807af49-769c-475b-9737-deb7af880de8',
    description: 'Area ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id_area: string;

  @ApiProperty({
    example: 'Medicina externa',
    description: 'Area description',
    uniqueItems: true,
  })
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  descripcion: string;

  @ApiProperty({
    example: 'true',
    description: 'Area status',
  })
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
