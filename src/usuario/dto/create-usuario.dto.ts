import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EstacionTrabajo } from 'src/estacion-trabajo/entities/estacion-trabajo.entity';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Related Workstation ID (unique)',
    nullable: false,
    type: 'string',
  })
  @IsString()
  @IsUUID()
  estacion_trabajo: EstacionTrabajo;

  @ApiProperty({
    description: 'Professional CI',
    nullable: false,
  })
  @IsString()
  @MaxLength(12)
  us_cedula: string;

  @ApiProperty({
    description: 'Professional Name',
    nullable: false,
  })
  @IsString()
  us_nombres: string;

  @ApiProperty({
    description: 'Professional Last Name',
    nullable: false,
  })
  @IsString()
  us_apellidos: string;

  @ApiProperty({
    description: 'Professional Status',
    nullable: false,
  })
  @IsBoolean()
  us_isActive: boolean;

  @ApiProperty({
    description: 'Professional Career',
    nullable: false,
  })
  @IsString()
  us_carrera: string;

  @ApiProperty({
    description: 'Professional Phone',
    nullable: false,
  })
  @IsString()
  @MaxLength(15)
  us_telefono: string;

  @ApiProperty({
    description: 'Professional Date of birth',
    nullable: false,
    type: 'string',
  })
  @IsDateString()
  us_fecha_nac: Date;

  @ApiProperty({
    description: 'Professional Genre',
    nullable: false,
  })
  @IsString()
  us_sexo: string;

  @ApiProperty({
    description: 'Professional User',
    nullable: false,
  })
  @IsString()
  us_user: string;

  @ApiProperty({
    description: 'Professional Password',
    nullable: false,
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message:
  //     'The password must have a Uppercase, lowercase letter and a number.',
  // })
  us_password: string;

  @ApiProperty({
    description: 'Professional Rol',
    nullable: false,
  })
  @IsString()
  us_role: string;
}
