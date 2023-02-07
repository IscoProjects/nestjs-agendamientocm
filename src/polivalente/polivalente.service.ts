import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePolivalenteDto } from './dto/create-polivalente.dto';
import { UpdatePolivalenteDto } from './dto/update-polivalente.dto';
import { Polivalente } from './entities/polivalente.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

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

    const polivalente = await this.polivalenteRepository.find({
      take: limit,
      skip: offset,
      relations: {
        usuario: true,
      },
    });

    return polivalente.map((polivalente) => ({
      ...polivalente,
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
          usuario: true,
        },
      });
    } else {
      const queryBuilder =
        this.polivalenteRepository.createQueryBuilder('polivalente');
      polivalente = await queryBuilder
        .leftJoinAndSelect('polivalente.usuario', 'usuario')
        .where('pol_descripcion=:pol_descripcion', {
          pol_descripcion: term,
        })
        .getOne();
    }

    if (!polivalente)
      throw new NotFoundException(`Polivalente con ID: ${term} no encontrado`);
    return polivalente;
  }

  async update(id: string, updatePolivalenteDto: UpdatePolivalenteDto) {
    const polivalente = await this.polivalenteRepository.preload({
      id_polivalente: id,
      ...updatePolivalenteDto,
    });
    if (!polivalente)
      throw new NotFoundException(`Polivalente con id: ${id} no encontrado`);
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
