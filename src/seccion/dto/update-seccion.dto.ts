import { CreateSeccionDto } from './create-seccion.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateSeccionDto extends PartialType(CreateSeccionDto) {}
