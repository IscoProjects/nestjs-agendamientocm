import { CreateAgendamientoDto } from './create-agendamiento.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAgendamientoDto extends PartialType(CreateAgendamientoDto) {}
