import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUnmetDemandDto } from './dto/create-unmet_demand.dto';
import { UpdateUnmetDemandDto } from './dto/update-unmet_demand.dto';
import { UnmetDemand } from './entities/unmet_demand.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class UnmetDemandService {
  constructor(
    @InjectRepository(UnmetDemand)
    private readonly unmetRepository: Repository<UnmetDemand>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}
  async create(createUnmetDemandDto: CreateUnmetDemandDto) {
    try {
      const unmet = this.unmetRepository.create(createUnmetDemandDto);
      await this.unmetRepository.save(unmet);
      return unmet;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 25, offset = 0 } = paginationDto;

    const unmet = await this.unmetRepository.find({
      take: limit,
      skip: offset,
      relations: {
        usuario: true,
        paciente: true,
      },
    });

    return unmet.map((unmet) => ({
      ...unmet,
    }));
  }

  async findOne(term: string) {
    const unmet = await this.unmetRepository.findOne({
      where: {
        id_asercion: term,
      },
      relations: {
        paciente: true,
      },
    });

    if (!unmet)
      throw new NotFoundException(`Unmet con ID: ${term} no encontrado`);
    return unmet;
  }

  async update(id: string, updateUnmetDemandDto: UpdateUnmetDemandDto) {
    const unmet = await this.unmetRepository.preload({
      id_asercion: id,
      ...updateUnmetDemandDto,
    });
    if (!unmet)
      throw new NotFoundException(`Aserción con ID: ${id} no encontrado`);
    try {
      await this.unmetRepository.save(unmet);
      return unmet;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteUnmet = await this.findOne(id);
    await this.unmetRepository.remove(deleteUnmet);
  }
}
