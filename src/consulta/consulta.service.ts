import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}
  async create(createConsultaDto: CreateConsultaDto) {
    try {
      const consulta = this.consultaRepository.create(createConsultaDto);
      await this.consultaRepository.save(consulta);
      return consulta;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 25, offset = 0 } = paginationDto;

    const consulta = await this.consultaRepository.find({
      take: limit,
      skip: offset,
      relations: {
        agendamiento: true,
      },
    });

    return consulta.map((consulta) => ({
      ...consulta,
      agendamiento: consulta.agendamiento,
    }));
  }

  async findOne(term: string) {
    const consulta: Consulta = await this.consultaRepository.findOne({
      where: {
        id_consulta: term,
      },
      relations: {
        agendamiento: true,
      },
    });

    if (!consulta)
      throw new NotFoundException(`Consulta ${term} no encontrado`);
    return consulta;
  }

  async findOneByMed(term: string) {
    const queryBuilder = this.consultaRepository.createQueryBuilder('consulta');
    const consulta = await queryBuilder
      .leftJoinAndSelect('consulta.agendamiento', 'agendamiento')
      .where('med_responsable=:med_responsable', {
        med_responsable: term,
      })
      .getMany();

    if (!consulta)
      throw new NotFoundException(`Consulta con médico: ${term} no encontrado`);
    return consulta;
  }

  async update(id: string, updateConsultaDto: UpdateConsultaDto) {
    const consulta = await this.consultaRepository.preload({
      id_consulta: id,
      ...updateConsultaDto,
    });
    if (!consulta)
      throw new NotFoundException(
        `Consulta médica con ID: ${id} no encontrada`,
      );
    try {
      await this.consultaRepository.save(consulta);
      return consulta;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteConsulta = await this.findOne(id);
    await this.consultaRepository.remove(deleteConsulta);
  }
}
