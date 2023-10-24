import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Seccion } from 'src/seccion/entities/seccion.entity';

export class CreateEstacionTrabajoDto {
  @ApiProperty({
    description: 'Related Section ID (unique)',
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsUUID()
  seccion: Seccion;

  @ApiProperty({
    description: 'Workstation description',
    nullable: false,
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Workstation status',
    nullable: false,
  })
  @IsBoolean()
  isAvailible: boolean;
}
