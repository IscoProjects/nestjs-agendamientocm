import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  user: {
    id_usuario: string;
    us_isActive: boolean;
    us_user: string;
    us_role: string;
  };

  @ApiProperty()
  token: string;
}

export class AVGDayResponse {
  @ApiProperty()
  dia: string;
  @ApiProperty()
  ttiempo_espera_promedio: number;
}

export class AVGSectionResponse {
  @ApiProperty()
  seccion: string;
  @ApiProperty()
  ttiempo_espera_promedio: number;
}
