import { Agendamiento } from './entities/agendamiento.entity';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Between, Repository, Not } from 'typeorm';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  async create(createAgendamientoDto: CreateAgendamientoDto) {
    try {
      const agendamiento = this.agendamientoRepository.create(
        createAgendamientoDto,
      );
      await this.agendamientoRepository.save(agendamiento);
      return agendamiento;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 25, offset = 0 } = paginationDto;

    const agendamiento = await this.agendamientoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        paciente: true,
        consulta: true,
      },
    });

    return agendamiento.map((agendamiento) => ({
      ...agendamiento,
    }));
  }

  async findByDateRange(seccion: string, startDate: string, endDate: string) {
    const agendamientos = await this.agendamientoRepository.find({
      where: {
        seccion_agenda: seccion,
        fecha_consulta: Between(startDate, endDate),
      },
    });

    if (!agendamientos)
      throw new NotFoundException(
        `No existen agendamientos entre las dos fechas.`,
      );

    return agendamientos;
  }

  async findOneByID(term: string) {
    const agendamiento = await this.agendamientoRepository.findOne({
      where: {
        id_agenda: term,
      },
      relations: {
        paciente: true,
        consulta: true,
      },
    });

    if (!agendamiento)
      throw new NotFoundException(`Agendamiento con ID: ${term} no encontrado`);
    return agendamiento;
  }

  async findOneByCI(term: string) {
    const agendamiento = await this.agendamientoRepository.find({
      relations: {
        paciente: true,
        consulta: true,
      },
      where: {
        paciente: {
          pac_cedula: term,
        },
      },
    });

    if (!agendamiento)
      throw new NotFoundException(`Agendamiento con CI: ${term} no encontrado`);
    return agendamiento;
  }

  async findAllByArea(term: string) {
    const agendamiento = await this.agendamientoRepository.find({
      where: {
        area_agenda: term,
      },
      relations: {
        paciente: true,
        consulta: true,
      },
      order: {
        hora_consulta: 'ASC',
      },
    });

    if (!agendamiento)
      throw new NotFoundException(`Agendamiento(s) para ${term} no encontrado`);
    return agendamiento;
  }

  async findAllBySeccion(term: string) {
    const agendamiento = await this.agendamientoRepository.find({
      where: {
        seccion_agenda: term,
      },
      relations: {
        paciente: true,
        consulta: true,
      },
      order: {
        hora_consulta: 'ASC',
      },
    });

    if (!agendamiento)
      throw new NotFoundException(`Agendamiento(s) para ${term} no encontrado`);
    return agendamiento;
  }

  async findByPolAndDate(term: string, date: string) {
    const agendamiento = await this.agendamientoRepository.find({
      where: {
        pol_agenda: term,
        fecha_consulta: date,
      },
      relations: {
        paciente: true,
      },
      order: {
        hora_consulta: 'ASC',
      },
    });

    if (!agendamiento)
      throw new NotFoundException(`Agendamiento(s) para ${term} no encontrado`);
    return agendamiento;
  }

  async findAllByPol(term: string) {
    const agendamiento = await this.agendamientoRepository.find({
      where: {
        pol_agenda: term,
        appointment_status: Not('Cancelado'),
      },
      relations: {
        paciente: true,
        consulta: true,
      },
      order: {
        hora_consulta: 'ASC',
      },
    });

    if (!agendamiento)
      throw new NotFoundException(`Agendamiento(s) para ${term} no encontrado`);
    return agendamiento;
  }

  async update(id: string, updateAgendamientoDto: UpdateAgendamientoDto) {
    const agendamiento = await this.agendamientoRepository.preload({
      id_agenda: id,
      ...updateAgendamientoDto,
    });
    if (!agendamiento)
      throw new NotFoundException(`Agendamiento con ID: ${id} no encontrado`);
    try {
      await this.agendamientoRepository.save(agendamiento);
      return agendamiento;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteAgendamiento = await this.findOneByID(id);
    await this.agendamientoRepository.remove(deleteAgendamiento);
  }
}
