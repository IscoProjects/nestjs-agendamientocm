import { Polivalente } from '../../polivalente/entities/polivalente.entity';
import {
  IsBoolean,
  IsDateString,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsUUID()
  polivalente: Polivalente;

  @IsString()
  @MaxLength(10)
  us_cedula: string;

  @IsString()
  us_nombres: string;

  @IsString()
  us_apellidos: string;

  @IsBoolean()
  us_isActive: boolean;

  @IsString()
  us_carrera: string;

  @IsString()
  @MaxLength(10)
  us_telefono: string;

  @IsDateString()
  us_fecha_nac: Date;

  @IsString()
  us_user: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  // @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message:
  //     'The password must have a Uppercase, lowercase letter and a number.',
  // })
  us_password: string;

  @IsString()
  us_role: string;
}
