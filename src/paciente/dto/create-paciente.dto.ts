import {
  IsArray,
  IsDateString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  @MinLength(8)
  @MaxLength(10)
  pac_cedula: string;

  @IsString()
  pac_nombre: string;

  @IsString()
  pac_apellido: string;

  @IsString()
  pac_sexo: string;

  @IsDateString()
  pac_fecha_nac: Date;

  @IsString()
  @MaxLength(12)
  pac_telefono: string;

  @IsArray()
  @IsString({ each: true })
  pac_gprioritario: string[];

  @IsString()
  pac_provincia: string;

  @IsString()
  pac_canton: string;

  @IsString()
  pac_direccion: string;

  @IsString()
  pac_ref_person: string;

  @IsString()
  pac_ref_parentesco: string;

  @IsString()
  @MaxLength(15)
  pac_ref_telefono: string;
}
