import { CreatePacienteDto } from './create-paciente.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdatePacienteDto extends PartialType(CreatePacienteDto) {}
