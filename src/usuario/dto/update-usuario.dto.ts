import { CreateUsuarioDto } from './create-usuario.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
