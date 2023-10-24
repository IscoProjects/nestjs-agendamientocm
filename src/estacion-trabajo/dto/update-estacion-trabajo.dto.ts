import { CreateEstacionTrabajoDto } from './create-estacion-trabajo.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateEstacionTrabajoDto extends PartialType(
  CreateEstacionTrabajoDto,
) {}
