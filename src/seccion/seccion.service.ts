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
      order: {
        area: {
          descripcion: 'ASC',
        },
      },
    });

    return seccion;
  }

  async findSeccionAndPolEnabled() {
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
    const seccion = await this.seccionRepository
      .createQueryBuilder('seccion')
      .leftJoinAndSelect('seccion.estacion_trabajo', 'estacion_trabajo')
      .where((qb) => {
        if (isUUID(term)) {
          qb.where('seccion.id_seccion = :id', { id: term });
        } else {
          qb.where('seccion.descripcion = :descripcion', {
            descripcion: term,
          });
        }
      })
      .getOne();

    return seccion;
  }

  //Buscar secciones que pertenecen a un Area
  async findByArea(term: string) {
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

    return seccion;
  }

  async getAvgWaitingTimeBySeccion(days: number) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - days);
    limitDate.setHours(0, 0, 0, 0);

    const avgSeccion = await this.seccionRepository
      .createQueryBuilder('seccion')
      .leftJoin('seccion.estacion_trabajo', 'estacion_trabajo')
      .leftJoin('estacion_trabajo.usuario', 'usuario')
      .leftJoin('usuario.agendamiento', 'agendamiento')
      .leftJoin('agendamiento.consulta', 'consulta')
      .select([
        'seccion.descripcion AS seccion',
        'AVG(consulta.tiempo_espera) AS tiempo_espera_promedio',
      ])
      .where('agendamiento.fecha_agenda >= :limitDate', { limitDate })
      .groupBy('seccion.descripcion')
      .getRawMany();

    return avgSeccion.map((item) => ({
      seccion: item.seccion,
      tiempo_espera_promedio: parseFloat(item.tiempo_espera_promedio) || 0,
    }));
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
