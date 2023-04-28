import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

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

  @IsString()
  pac_gprioritario: string;

  @IsString()
  pac_afiliacion: string;

  @IsString()
  pac_referencia: string;

  @IsString()
  pac_parentesco_ref: string;

  @IsString()
  @MaxLength(12)
  pac_tel_ref: string;

  @IsString()
  pac_dir_ref: string;
}
