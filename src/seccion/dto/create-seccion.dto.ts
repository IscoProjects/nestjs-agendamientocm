import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';
import { Area } from 'src/area/entities/area.entity';

export class CreateSeccionDto {
  @ApiProperty({
    description: 'Related Area ID (unique)',
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsUUID()
  area: Area;

  @ApiProperty({
    description: 'Section Description',
    nullable: false,
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Section Status',
    nullable: false,
  })
  @IsBoolean()
  isAvailible: boolean;
}
