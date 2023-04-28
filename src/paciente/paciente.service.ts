import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  async create(createPacienteDto: CreatePacienteDto) {
    try {
      const paciente = this.pacienteRepository.create(createPacienteDto);
      await this.pacienteRepository.save(paciente);
      return paciente;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 25, offset = 0 } = paginationDto;

    const paciente = await this.pacienteRepository.find({
      take: limit,
      skip: offset,
      relations: {
        agendamiento: true,
      },
    });

    return paciente.map((paciente) => ({
      ...paciente,
      agendamiento: paciente.agendamiento,
    }));
  }

  async findOne(term: string) {
    let paciente: Paciente;

    if (isUUID(term)) {
      paciente = await this.pacienteRepository.findOne({
        where: {
          id_paciente: term,
        },
        relations: {
          agendamiento: true,
        },
      });
    } else {
      const queryBuilder =
        this.pacienteRepository.createQueryBuilder('paciente');
      paciente = await queryBuilder
        .leftJoinAndSelect('paciente.agendamiento', 'agendamiento')
        .where('pac_cedula=:pac_cedula', {
          pac_cedula: term,
        })
        .getOne();
    }

    if (!paciente)
      throw new NotFoundException(`Paciente ${term} no encontrado`);
    return paciente;
  }

  async update(id: string, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.pacienteRepository.preload({
      id_paciente: id,
      ...updatePacienteDto,
    });
    if (!paciente)
      throw new NotFoundException(`Paciente con id: ${id} no encontrado`);
    try {
      await this.pacienteRepository.save(paciente);
      return paciente;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deletePaciente = await this.findOne(id);
    await this.pacienteRepository.remove(deletePaciente);
  }
}
