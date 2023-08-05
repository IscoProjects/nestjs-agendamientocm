import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { isUUID } from 'class-validator';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    private readonly errorDBException: ErrorHandleDBService,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    try {
      const area = this.areaRepository.create(createAreaDto);
      await this.areaRepository.save(area);
      return area;
    } catch (error) {
      this.errorDBException.errorHandleDBException(error);
    }
  }

  async findAllMetadata() {
    const area = await this.areaRepository.find({
      relations: {
        seccion: {
          estacion_trabajo: {
            usuario: true,
          },
        },
      },
    });

    if (!area) throw new NotFoundException(`No existen datos para mostrar.`);

    return area;
  }

  async findAll() {
    const area = await this.areaRepository.find({
      relations: {
        seccion: true,
      },
    });

    if (!area) throw new NotFoundException(`No existen datos para mostrar.`);

    return area;
  }

  async findOne(term: string) {
    const area = await this.areaRepository
      .createQueryBuilder('area')
      .leftJoinAndSelect('area.seccion', 'seccion')
      .where((qb) => {
        if (isUUID(term)) {
          qb.where('area.id_area = :id', { id: term });
        } else {
          qb.where('area.descripcion = :descripcion', {
            descripcion: term,
          });
        }
      })
      .getOne();

    if (!area) {
      throw new NotFoundException(`Búsqueda para: ${term}, sin resultados.`);
    }

    return area;
  }

  async update(id: string, updateAreaDto: UpdateAreaDto) {
    const area = await this.areaRepository.preload({
      id_area: id,
      ...updateAreaDto,
    });
    if (!area)
      throw new NotFoundException(`Area con ID: ${id}, no encontrado.`);
    try {
      await this.areaRepository.save(area);
      return area;
    } catch (error) {
      this.errorDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteArea = await this.findOne(id);
    await this.areaRepository.remove(deleteArea);
  }
}
