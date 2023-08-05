import { PartialType } from '@nestjs/mapped-types';
import { CreateEstacionTrabajoDto } from './create-estacion-trabajo.dto';

export class UpdateEstacionTrabajoDto extends PartialType(CreateEstacionTrabajoDto) {}
