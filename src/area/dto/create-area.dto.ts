import { IsBoolean, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  descripcion: string;

  @IsBoolean()
  isAvailible: boolean;
}
