import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  us_user: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  us_password: string;
}
