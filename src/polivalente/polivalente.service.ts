import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePolivalenteDto } from './dto/create-polivalente.dto';
import { UpdatePolivalenteDto } from './dto/update-polivalente.dto';
import { Polivalente } from './entities/polivalente.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class PolivalenteService {
  constructor(
    @InjectRepository(Polivalente)
    private readonly polivalenteRepository: Repository<Polivalente>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  async create(createPolivalenteDto: CreatePolivalenteDto) {
    try {
      const polivalente =
        this.polivalenteRepository.create(createPolivalenteDto);
      await this.polivalenteRepository.save(polivalente);
      return polivalente;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const polivalentes = await this.polivalenteRepository.find({
      take: limit,
      skip: offset,
      relations: {
        agendamiento: true,
      },
    });

    return polivalentes.map((polivalente) => ({
      ...polivalente,
      agendamiento: polivalente.agendamiento,
    }));
  }

  async findOne(term: string) {
    let polivalente: Polivalente;

    if (isUUID(term)) {
      polivalente = await this.polivalenteRepository.findOne({
        where: {
          id_polivalente: term,
        },
        relations: {
          agendamiento: true,
        },
      });
    } else {
      const queryBuilder =
        this.polivalenteRepository.createQueryBuilder('polivalente');
      polivalente = await queryBuilder
        .leftJoinAndSelect('polivalente.agendamiento', 'agendamiento')
        .where('nro_polivalente=:nro_polivalente', {
          nro_polivalente: term,
        })
        .getOne();
    }

    if (!polivalente)
      throw new NotFoundException(`polivalente ${term} no encontrado`);
    return polivalente;
  }

  async update(id: string, updatePolivalenteDto: UpdatePolivalenteDto) {
    const polivalente = await this.polivalenteRepository.preload({
      id_polivalente: id,
      ...updatePolivalenteDto,
    });
    if (!polivalente)
      throw new NotFoundException(`Polivalente con ID ${id} no encontrado`);

    try {
      await this.polivalenteRepository.save(polivalente);
      return polivalente;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deletePolivalente = await this.findOne(id);
    await this.polivalenteRepository.remove(deletePolivalente);
  }
}
