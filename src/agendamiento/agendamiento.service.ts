import { Agendamiento } from './entities/agendamiento.entity';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Repository } from 'typeorm';
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
    const { limit = 10, offset = 0 } = paginationDto;

    const agendamiento = await this.agendamientoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        usuario: true,
        paciente: true,
        polivalente: true,
      },
    });

    return agendamiento.map((agendamiento) => ({
      ...agendamiento,
      polivalente: agendamiento.polivalente,
    }));
  }

  async findOne(term: string) {
    const agendamiento: Agendamiento =
      await this.agendamientoRepository.findOne({
        where: {
          id_agendamiento: term,
        },
        relations: {
          usuario: true,
          paciente: true,
          polivalente: true,
        },
      });

    if (!agendamiento)
      throw new NotFoundException(`Agendamiento con ID: ${term} no encontrado`);
    return agendamiento;
  }

  async update(id: string, updateAgendamientoDto: UpdateAgendamientoDto) {
    const agendamiento = await this.agendamientoRepository.preload({
      id_agendamiento: id,
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
    const deleteAgendamiento = await this.findOne(id);
    await this.agendamientoRepository.remove(deleteAgendamiento);
  }
}
