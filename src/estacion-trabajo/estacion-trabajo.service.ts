import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstacionTrabajoDto } from './dto/create-estacion-trabajo.dto';
import { UpdateEstacionTrabajoDto } from './dto/update-estacion-trabajo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstacionTrabajo } from './entities/estacion-trabajo.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { isUUID } from 'class-validator';

@Injectable()
export class EstacionTrabajoService {
  constructor(
    @InjectRepository(EstacionTrabajo)
    private readonly estacionRepository: Repository<EstacionTrabajo>,
    private readonly errorDBException: ErrorHandleDBService,
  ) {}

  async create(createEstacionTrabajoDto: CreateEstacionTrabajoDto) {
    try {
      const estacion = this.estacionRepository.create(createEstacionTrabajoDto);
      await this.estacionRepository.save(estacion);
      return estacion;
    } catch (error) {
      this.errorDBException.errorHandleDBException(error);
    }
  }

  async findAll() {
    const estacion = await this.estacionRepository
      .createQueryBuilder('estacion')
      .leftJoinAndSelect('estacion.usuario', 'usuario')
      .leftJoinAndSelect('estacion.seccion', 'seccion')
      .getMany();

    if (!estacion)
      throw new NotFoundException(`No existe información para mostrar`);

    return estacion;
  }

  async findOne(term: string) {
    const estacion = await this.estacionRepository
      .createQueryBuilder('estacion')
      .leftJoinAndSelect('estacion.usuario', 'usuario')
      .leftJoinAndSelect('estacion.seccion', 'seccion')
      .where((qb) => {
        if (isUUID(term)) {
          qb.where('estacion.id_estacion = :id', { id: term });
        } else {
          qb.where('estacion.descripcion = :descripcion', {
            descripcion: term,
          });
        }
      })
      .getOne();

    if (!estacion)
      throw new NotFoundException(
        `Búsqueda para la estacion de trabajo: '${term}', sin resultados`,
      );

    return estacion;
  }

  async findAllBySection(term: string) {
    const estacion = await this.estacionRepository
      .createQueryBuilder('estacion')
      .leftJoinAndSelect('estacion.usuario', 'usuario')
      .leftJoinAndSelect('estacion.seccion', 'seccion')
      .where((qb) => {
        if (isUUID(term)) {
          qb.where('seccion.id_seccion = :id', { id: term });
        } else {
          qb.where('seccion.descripcion = :descripcion', {
            descripcion: term,
          });
        }
      })
      .orderBy('estacion.descripcion', 'ASC')
      .getMany();

    if (!estacion || estacion.length === 0)
      throw new NotFoundException(
        `Estación de trabajo para la sección: '${term}', no encontrados`,
      );

    return estacion;
  }

  async findAllBySectionAndDate(term: string, date: string) {
    const queryBuilder = this.estacionRepository
      .createQueryBuilder('estacion')
      .leftJoinAndSelect('estacion.usuario', 'usuario')
      .leftJoinAndSelect('estacion.seccion', 'seccion')
      .leftJoinAndSelect(
        'usuario.agendamiento',
        'agendamiento',
        'agendamiento.fecha_consulta = :date',
        { date },
      );

    let estaciones: EstacionTrabajo[];

    if (isUUID(term)) {
      estaciones = await queryBuilder
        .where('seccion.id_seccion = :id', { id: term })
        .orderBy('estacion.descripcion', 'ASC')
        .getMany();
    } else {
      estaciones = await queryBuilder
        .where('seccion.descripcion = :descripcion', {
          descripcion: term,
        })
        .orderBy('estacion.descripcion', 'ASC')
        .getMany();
    }

    if (estaciones.length === 0) {
      estaciones = await this.estacionRepository.find({
        relations: {
          usuario: true,
          seccion: true,
        },
        where: isUUID(term)
          ? { seccion: { id_seccion: term } }
          : { seccion: { descripcion: term } },
      });
    }

    if (estaciones.length === 0)
      throw new NotFoundException(
        `Estaciones para la sección; '${term}', no encontrados.`,
      );

    return estaciones;
  }

  async update(id: string, updateEstacionTrabajoDto: UpdateEstacionTrabajoDto) {
    const estacion = await this.estacionRepository.preload({
      id_estacion: id,
      ...updateEstacionTrabajoDto,
    });
    if (!estacion)
      throw new NotFoundException(`Estación con id: ${id}, no encontrado`);
    try {
      await this.estacionRepository.save(estacion);
      return estacion;
    } catch (error) {
      this.errorDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteEstacion = await this.findOne(id);
    await this.estacionRepository.remove(deleteEstacion);
  }
}
