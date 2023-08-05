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
        estacion_trabajo: true,
        area: true,
      },
    });

    return seccion;
  }

  async findSeccionAndPol() {
    const seccion = await this.seccionRepository.find({
      relations: {
        estacion_trabajo: true,
      },
      where: {
        isAvailible: true,
        estacion_trabajo: {
          isAvailible: true,
        },
      },
    });

    return seccion;
  }

  async findOne(term: string) {
    let seccion: Seccion;

    if (isUUID(term)) {
      seccion = await this.seccionRepository.findOne({
        where: {
          id_seccion: term,
        },
        relations: {
          estacion_trabajo: true,
        },
      });
    } else {
      const queryBuilder = this.seccionRepository.createQueryBuilder('seccion');
      seccion = await queryBuilder
        .leftJoinAndSelect('seccion.estacion_trabajo', 'estacion_trabajo')
        .where('seccion.descripcion=:descripcion', {
          descripcion: term,
        })
        .getOne();
    }

    if (!seccion)
      throw new NotFoundException(
        `Búsqueda para sección: ${term}, sin resultados`,
      );

    return seccion;
  }

  //Buscar secciones que pertenecen a un Area
  async findByArea(term: string) {
    // let seccion: Seccion[];

    // if (isUUID(term)) {
    //   seccion = await this.seccionRepository.find({
    //     where: {
    //       area: {
    //         id_area: term,
    //       },
    //     },
    //     relations: {
    //       area: true,
    //     },
    //   });
    // } else {
    //   const queryBuilder = this.seccionRepository.createQueryBuilder('seccion');
    //   seccion = await queryBuilder
    //     .leftJoinAndSelect('seccion.area', 'area')
    //     .where('area.descripcion = :term', { term })
    //     .getMany();
    // }

    // if (!seccion)
    //   throw new NotFoundException(
    //     `Seccion(es) pertenecientes al área con ID: ${term} no encontrado`,
    //   );

    // return seccion;

    const seccion = await this.seccionRepository
      .createQueryBuilder('seccion')
      .leftJoinAndSelect('seccion.area', 'area')
      .where((qb) => {
        if (isUUID(term)) {
          qb.where('area.id_area = :id', { id: term });
        } else {
          qb.where('area.descripcion = :descripcion', {
            descripcion: term,
          });
        }
      })
      .getMany();

    if (!seccion || seccion.length === 0) {
      throw new NotFoundException(
        `Sección(es) pertenecientes al área: ${term} no encontradas`,
      );
    }

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
