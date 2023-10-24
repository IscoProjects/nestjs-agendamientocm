import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Professional user',
    nullable: false,
  })
  @IsString()
  us_user: string;

  @ApiProperty({
    description: 'Professional password',
    nullable: false,
    minLength: 6,
    maxLength: 24,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  us_password: string;
}
