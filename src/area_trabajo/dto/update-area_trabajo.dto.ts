import { PartialType } from '@nestjs/mapped-types';
import { CreateAreaTrabajoDto } from './create-area_trabajo.dto';

export class UpdateAreaTrabajoDto extends PartialType(CreateAreaTrabajoDto) {}
