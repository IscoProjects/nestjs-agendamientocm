import { Agendamiento } from './entities/agendamiento.entity';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { AgendamientosWsGateway } from 'src/agendamientos-ws/agendamientos-ws.gateway';

@Injectable()
export class AgendamientoService {
  constructor(
    @InjectRepository(Agendamiento)
    private readonly agendamientoRepository: Repository<Agendamiento>,
    private readonly errorHandleDBException: ErrorHandleDBService,
    private readonly agendamientosWsGateway: AgendamientosWsGateway,
  ) {}

  async create(createAgendamientoDto: CreateAgendamientoDto) {
    try {
      const agendamiento = this.agendamientoRepository.create(
        createAgendamientoDto,
      );
      await this.agendamientoRepository.save(agendamiento);
      this.agendamientosWsGateway.sendAgendamiento(agendamiento);
      return agendamiento;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll() {
    const agendamiento = await this.agendamientoRepository.find({
      relations: {
        paciente: true,
        consulta: true,
        usuario: true,
      },
    });

    return agendamiento;
  }

  async findOneByID(id: string) {
    const agendamiento = await this.agendamientoRepository.findOne({
      where: {
        id_agendamiento: id,
      },
      relations: {
        paciente: true,
        consulta: true,
      },
    });

    return agendamiento;
  }

  async findAllByProfessional(id: string) {
    const agendamiento = await this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .innerJoinAndSelect('agendamiento.usuario', 'usuario')
      .innerJoinAndSelect('agendamiento.paciente', 'paciente')
      .where('usuario.id_usuario = :id', { id })
      .getMany();

    return agendamiento;
  }

  async findByProfessionalAndDate(id: string, date: string) {
    const agendamiento = await this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .leftJoinAndSelect('agendamiento.usuario', 'usuario')
      .leftJoinAndSelect('agendamiento.paciente', 'paciente')
      .leftJoinAndSelect('agendamiento.consulta', 'consulta')
      .leftJoinAndSelect('usuario.estacion_trabajo', 'estacion_trabajo')
      .leftJoinAndSelect('estacion_trabajo.seccion', 'seccion')
      .where('usuario.id_usuario = :id', { id: id })
      .andWhere('agendamiento.fecha_consulta = :date', { date: date })
      .andWhere('agendamiento.detalle_agenda IN (:...demandaAgendada)', {
        demandaAgendada: ['Consulta', 'Interconsulta', 'Reagendado'],
      })
      .orderBy('hora_consulta', 'ASC')
      .getMany();

    return agendamiento;
  }

  async findAllByProfessionalAndDates(
    id: string,
    startDate: string,
    endDate: string,
  ) {
    const agendamiento = await this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .innerJoinAndSelect('agendamiento.usuario', 'usuario')
      .innerJoin('usuario.estacion_trabajo', 'estacion_trabajo')
      .innerJoinAndSelect('agendamiento.paciente', 'paciente')
      .where('usuario.id_usuario = :id', { id })
      .andWhere('agendamiento.fecha_consulta BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    return agendamiento;
  }

  async findBetweenDates(startDate: string, endDate: string) {
    const agendamiento = await this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .leftJoinAndSelect('agendamiento.paciente', 'paciente')
      .leftJoinAndSelect('agendamiento.consulta', 'consulta')
      .leftJoinAndSelect('agendamiento.usuario', 'usuario')
      .where('agendamiento.fecha_consulta >= :startDate', {
        startDate: startDate,
      })
      .andWhere('agendamiento.fecha_consulta <= :endDate', { endDate: endDate })
      .getMany();

    return agendamiento;
  }

  async getAVGWaitingTime(days: number) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - days);
    limitDate.setHours(0, 0, 0, 0);

    const promediosPorDia = await this.agendamientoRepository
      .createQueryBuilder('agendamiento')
      .innerJoin('agendamiento.consulta', 'consulta')
      .select([
        'DATE(agendamiento.fecha_consulta) AS dia',
        'AVG(consulta.tiempo_espera) AS tiempo_espera_promedio',
      ])
      .where('agendamiento.fecha_agenda >= :limitDate', { limitDate })
      .andWhere('consulta.hora_registro IS NOT NULL')
      .groupBy('dia')
      .orderBy('dia', 'ASC')
      .getRawMany();

    return promediosPorDia.map((item) => ({
      dia: item.dia,
      tiempo_espera_promedio: parseFloat(item.tiempo_espera_promedio) || 0,
    }));
  }

  async update(id: string, updateAgendamientoDto: UpdateAgendamientoDto) {
    const agendamiento = await this.agendamientoRepository.preload({
      id_agendamiento: id,
      ...updateAgendamientoDto,
    });
    if (!agendamiento)
      throw new NotFoundException(`Agendamiento con ID: ${id} no encontrado`);
    try {
      await this.agendamientoRepository.save(agendamiento);
      return agendamiento;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteAgendamiento = await this.findOneByID(id);
    await this.agendamientoRepository.remove(deleteAgendamiento);
  }
}
