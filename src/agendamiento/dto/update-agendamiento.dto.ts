import { PartialType } from '@nestjs/swagger';
import { CreateAgendamientoDto } from './create-agendamiento.dto';

export class UpdateAgendamientoDto extends PartialType(CreateAgendamientoDto) {}
