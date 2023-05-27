import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { Seccion } from './entities/seccion.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { isUUID } from 'class-validator';

@Injectable()
export class SeccionService {
  constructor(
    @InjectRepository(Seccion)
    private readonly seccionRepository: Repository<Seccion>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  async create(createSeccionDto: CreateSeccionDto) {
    try {
      const seccion = this.seccionRepository.create(createSeccionDto);
      await this.seccionRepository.save(seccion);
      return seccion;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll() {
    const seccion = await this.seccionRepository.find({
      relations: {
        polivalente: true,
        // polivalente: {
        //   usuario: true,
        // },
      },
    });

    return seccion.map((seccion) => ({
      ...seccion,
    }));
  }

  async findOne(term: string) {
    let seccion: Seccion;

    if (isUUID(term)) {
      seccion = await this.seccionRepository.findOne({
        where: {
          id_seccion: term,
        },
        relations: {
          polivalente: true,
        },
      });
    } else {
      const queryBuilder = this.seccionRepository.createQueryBuilder('seccion');
      seccion = await queryBuilder
        .leftJoinAndSelect('seccion.polivalente', 'polivalente')
        // .leftJoinAndSelect('polivalente.usuario', 'usuario')
        .where('seccion_descripcion=:seccion_descripcion', {
          seccion_descripcion: term,
        })
        .getOne();
    }

    if (!seccion)
      throw new NotFoundException(`Seccion con ID: ${term} no encontrado`);
    return seccion;
  }

  async update(id: string, updateSeccionDto: UpdateSeccionDto) {
    const seccion = await this.seccionRepository.preload({
      id_seccion: id,
      ...updateSeccionDto,
    });
    if (!seccion)
      throw new NotFoundException(`Seccion con ID: ${id} no encontrado`);
    try {
      await this.seccionRepository.save(seccion);
      return seccion;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteSeccion = await this.findOne(id);
    await this.seccionRepository.remove(deleteSeccion);
  }
}
