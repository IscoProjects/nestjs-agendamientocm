import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({
    description: 'Area description',
    nullable: false,
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Area status',
    nullable: false,
  })
  @IsBoolean()
  isAvailible: boolean;
}
