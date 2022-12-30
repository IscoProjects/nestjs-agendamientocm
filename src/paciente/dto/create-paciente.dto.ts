import { IsDateString, IsString, MaxLength } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
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
  @MaxLength(10)
  pac_telefono: string;

  @IsString()
  pac_gprioritario: string;

  @IsString()
  pac_afiliacion: string;
}
