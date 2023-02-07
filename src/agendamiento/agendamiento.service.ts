import { Agendamiento } from './entities/agendamiento.entity';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
// import { validate as isUUID } from 'uuid';

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
      },
    });

    return agendamiento.map((agendamiento) => ({
      ...agendamiento,
    }));
  }

  async findOne(term: string) {
    // let agendamiento: Agendamiento;
    // if (isUUID(term)) {
    //   agendamiento = await this.agendamientoRepository.findOne({
    //     where: {
    //       id_agendamiento: term,
    //     },
    //     relations: {
    //       usuario: true,
    //       paciente: true,
    //       polivalente: true,
    //     },
    //   });
    // } else {
    // const queryBuilder =
    //   this.agendamientoRepository.createQueryBuilder('agendamiento');
    // agendamiento = await queryBuilder
    //   .leftJoinAndSelect('agendamiento.paciente', 'paciente')
    //   .leftJoinAndSelect('agendamiento.polivalente', 'polivalente')
    //   .leftJoinAndSelect('agendamiento.usuario', 'usuario')
    //   .where('pac_cedula=:pac_cedula', {
    //     pac_cedula: term,
    //   })
    //   .getOne();

    const agendamiento = await this.agendamientoRepository.find({
      relations: {
        usuario: true,
        paciente: true,
      },
      where: {
        paciente: {
          pac_cedula: term,
        },
      },
    });

    if (!agendamiento)
      throw new NotFoundException(
        `Agendamiento con ID/CI: ${term} no encontrado`,
      );
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
    const deleteAgendamiento = await this.findOne(id);
    await this.agendamientoRepository.remove(deleteAgendamiento);
  }
}
