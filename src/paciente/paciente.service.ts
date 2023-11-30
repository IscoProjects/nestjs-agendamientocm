import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    private readonly errorHandleDBException: ErrorHandleDBService,
  ) {}

  async create(createPacienteDto: CreatePacienteDto) {
    try {
      const paciente = this.pacienteRepository.create(createPacienteDto);
      await this.pacienteRepository.save(paciente);
      return paciente;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAll() {
    const paciente = await this.pacienteRepository.find({
      relations: {
        agendamiento: {
          consulta: true,
        },
      },
    });

    return paciente;
  }

  async findOne(term: string) {
    const paciente = await this.pacienteRepository
      .createQueryBuilder('paciente')
      .leftJoinAndSelect('paciente.agendamiento', 'agendamiento')
      .leftJoinAndSelect('agendamiento.consulta', 'consulta')
      .where((qb) => {
        if (isUUID(term)) {
          qb.where('paciente.id_paciente = :id', { id: term });
        } else {
          qb.where('paciente.pac_cedula = :cedula', {
            cedula: term,
          });
        }
      })
      .orderBy('agendamiento.fecha_consulta', 'DESC')
      .getOne();

    if (!paciente)
      throw new NotFoundException(
        `Búsqueda de paciente: ${term}, no encontrado`,
      );

    return paciente;
  }

  async findPatientInformation(term: string) {
    const paciente = await this.pacienteRepository
      .createQueryBuilder('paciente')
      .leftJoinAndSelect('paciente.agendamiento', 'agendamiento')
      .leftJoinAndSelect('agendamiento.usuario', 'usuario')
      .leftJoinAndSelect('agendamiento.consulta', 'consulta')
      .leftJoinAndSelect('usuario.estacion_trabajo', 'estacion_trabajo')
      .leftJoinAndSelect('estacion_trabajo.seccion', 'seccion')
      .where((qb) => {
        if (isUUID(term)) {
          qb.where('paciente.id_paciente = :id', { id: term });
        } else {
          qb.where('paciente.pac_cedula = :cedula', {
            cedula: term,
          });
        }
      })
      .orderBy('agendamiento.fecha_consulta', 'DESC')
      .getOne();

    if (!paciente)
      throw new NotFoundException(
        `Búsqueda de paciente: ${term}, no encontrado`,
      );

    return paciente;
  }

  async update(id: string, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.pacienteRepository.preload({
      id_paciente: id,
      ...updatePacienteDto,
    });
    if (!paciente)
      throw new NotFoundException(`Paciente con id: ${id} no encontrado`);
    try {
      await this.pacienteRepository.save(paciente);
      return paciente;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deletePaciente = await this.findOne(id);
    await this.pacienteRepository.remove(deletePaciente);
  }
}
