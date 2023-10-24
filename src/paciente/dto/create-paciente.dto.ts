import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({
    description: 'Patient CI',
    nullable: false,
  })
  @IsString()
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  pac_cedula: string;

  @ApiProperty({
    description: 'Patient Name',
    nullable: false,
  })
  @IsString()
  pac_nombre: string;

  @ApiProperty({
    description: 'Patient Last Name',
    nullable: false,
  })
  @IsString()
  pac_apellido: string;

  @ApiProperty({
    description: 'Patient Genre',
    nullable: false,
  })
  @IsString()
  pac_sexo: string;

  @ApiProperty({
    description: 'Patient Date of birth',
    nullable: false,
    type: 'string',
  })
  @IsDateString()
  pac_fecha_nac: Date;

  @ApiProperty({
    description: 'Patient Phone',
    nullable: true,
  })
  @IsString()
  @MaxLength(12)
  pac_telefono: string;

  @ApiProperty({
    description: 'Patient Priority Group',
    nullable: false,
  })
  @IsArray()
  @IsString({ each: true })
  pac_gprioritario: string[];

  @ApiProperty({
    description: 'Patient Province',
    nullable: false,
  })
  @IsString()
  pac_provincia: string;

  @ApiProperty({
    description: 'Patient Canton',
    nullable: false,
  })
  @IsString()
  pac_canton: string;

  @ApiProperty({
    description: 'Patient Address',
    nullable: false,
  })
  @IsString()
  pac_direccion: string;

  @ApiProperty({
    description: 'Patient Reference Person',
    nullable: false,
  })
  @IsString()
  pac_ref_person: string;

  @ApiProperty({
    description: 'Patient Reference Person Relationship',
    nullable: false,
  })
  @IsString()
  pac_ref_parentesco: string;

  @ApiProperty({
    description: 'Patient Reference Person Phone',
    nullable: true,
  })
  @IsString()
  @MaxLength(15)
  pac_ref_telefono: string;
}
