import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';

@Injectable()
export class ConsultaService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultaRepository: Repository<Consulta>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  async create(createConsultaDto: CreateConsultaDto) {
    try {
      const consulta = this.consultaRepository.create(createConsultaDto);
      await this.consultaRepository.save(consulta);
      return consulta;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll() {
    const consulta = await this.consultaRepository.find({
      relations: {
        agendamiento: true,
      },
    });

    return consulta;
  }

  async findOne(id: string) {
    const consulta: Consulta = await this.consultaRepository.findOne({
      where: {
        id_consulta: id,
      },
      relations: {
        agendamiento: true,
      },
    });

    if (!consulta)
      throw new NotFoundException(`Consulta con ID: ${id}, no encontrado`);

    return consulta;
  }

  async findOneByProfessional(id: string) {
    const consulta = await this.consultaRepository
      .createQueryBuilder('consulta')
      .leftJoinAndSelect('consulta.agendamiento', 'agendamiento')
      .where('med_responsable=:med_responsable', {
        med_responsable: id,
      })
      .getMany();

    if (!consulta || consulta.length === 0)
      throw new NotFoundException(`Consulta con médico: ${id} no encontrado`);

    return consulta;
  }

  async update(id: string, updateConsultaDto: UpdateConsultaDto) {
    const consulta = await this.consultaRepository.preload({
      id_consulta: id,
      ...updateConsultaDto,
    });
    if (!consulta)
      throw new NotFoundException(
        `Consulta médica con ID: ${id} no encontrada`,
      );
    try {
      await this.consultaRepository.save(consulta);
      return consulta;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteConsulta = await this.findOne(id);
    await this.consultaRepository.remove(deleteConsulta);
  }
}
