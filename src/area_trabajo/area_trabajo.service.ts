import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaTrabajoDto } from './dto/create-area_trabajo.dto';
import { UpdateAreaTrabajoDto } from './dto/update-area_trabajo.dto';
import { Repository } from 'typeorm';
import { AreaTrabajo } from './entities/area_trabajo.entity';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class AreaTrabajoService {
  constructor(
    @InjectRepository(AreaTrabajo)
    private readonly areaRepository: Repository<AreaTrabajo>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  async create(createAreaTrabajoDto: CreateAreaTrabajoDto) {
    try {
      const areaTrabajo = this.areaRepository.create(createAreaTrabajoDto);
      await this.areaRepository.save(areaTrabajo);
      return areaTrabajo;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll() {
    const area = await this.areaRepository.find({
      relations: {
        seccion: true,
      },
    });

    return area.map((area) => ({
      ...area,
    }));
  }

  async findOne(term: string) {
    let area: AreaTrabajo;

    if (isUUID(term)) {
      area = await this.areaRepository.findOne({
        where: {
          id_atrabajo: term,
        },
        relations: {
          seccion: true,
        },
      });
    } else {
      const queryBuilder = this.areaRepository.createQueryBuilder('area');
      area = await queryBuilder
        .leftJoinAndSelect('area.seccion', 'seccion')
        .where('area_descripcion=:area_descripcion', {
          area_descripcion: term,
        })
        .getOne();
    }

    if (!area)
      throw new NotFoundException(`Area con ID: ${term} no encontrado`);
    return area;
  }

  async update(id: string, updateAreaTrabajoDto: UpdateAreaTrabajoDto) {
    const area = await this.areaRepository.preload({
      id_atrabajo: id,
      ...updateAreaTrabajoDto,
    });
    if (!area) throw new NotFoundException(`Area con ID: ${id} no encontrado`);
    try {
      await this.areaRepository.save(area);
      return area;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteArea = await this.findOne(id);
    await this.areaRepository.remove(deleteArea);
  }
}
