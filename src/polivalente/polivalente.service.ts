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

  async findAll() {
    const polivalente = await this.polivalenteRepository.find({
      relations: {
        usuario: true,
        seccion: true,
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
          seccion: true,
        },
      });
    } else {
      const queryBuilder =
        this.polivalenteRepository.createQueryBuilder('polivalente');
      polivalente = await queryBuilder
        .leftJoinAndSelect('polivalente.usuario', 'usuario')
        .leftJoinAndSelect('polivalente.seccion', 'seccion')
        .where('pol_descripcion=:pol_descripcion', {
          pol_descripcion: term,
        })
        .getOne();
    }

    if (!polivalente)
      throw new NotFoundException(`Polivalente '${term}' no encontrado`);
    return polivalente;
  }

  async findAllBySection(term: string) {
    let polivalente;
    const queryBuilder =
      this.polivalenteRepository.createQueryBuilder('polivalente');
    if (isUUID(term)) {
      polivalente = await queryBuilder
        .leftJoinAndSelect('polivalente.usuario', 'usuario')
        .leftJoinAndSelect('polivalente.seccion', 'seccion')
        .where({
          seccion: term,
        })
        .orderBy({ pol_descripcion: 'ASC' })
        .getMany();
    } else {
      polivalente = await queryBuilder
        .innerJoinAndSelect('polivalente.seccion', 'seccion')
        .leftJoinAndSelect('polivalente.usuario', 'usuario')
        .where('seccion.seccion_descripcion = :descripcion', {
          descripcion: term,
        })
        .orderBy({ pol_descripcion: 'ASC' })
        .getMany();
    }

    if (!polivalente)
      throw new NotFoundException(
        `Polivalentes para la sección '${term}' no encontrados`,
      );
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
