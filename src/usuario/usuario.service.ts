import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly errorHandleDBException: ErrorHandleDBService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { us_password, ...usuarioData } = createUsuarioDto;
      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        us_password: bcrypt.hashSync(us_password, 10),
      });
      await this.usuarioRepository.save(usuario);
      return usuario;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async findAllAssignmentsInformationFromUsers() {
    const usuario = await this.usuarioRepository.find({
      relations: {
        estacion_trabajo: {
          seccion: {
            area: true,
          },
        },
      },
    });

    return usuario;
  }

  async findAll() {
    const usuario = await this.usuarioRepository.find({
      relations: {
        estacion_trabajo: true,
      },
    });

    return usuario;
  }

  async findOne(term: string) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.estacion_trabajo', 'estacion_trabajo')
      .where((qb) => {
        if (isUUID(term)) {
          qb.where('user.id_usuario = :id', { id: term });
        } else {
          qb.where('user.us_cedula = :cedula', { cedula: term });
        }
      })
      .getOne();

    if (!usuario)
      throw new NotFoundException(
        `Búsqueda para usuario: ${term}, no encontrado`,
      );

    return usuario;
  }

  async findUser(term: string) {
    const user = await this.usuarioRepository.findOne({
      where: {
        us_user: term,
      },
    });
    if (user) throw new NotFoundException(`Usuario ${term} ya existe.`);
    return true;
  }

  async findBySection(term: string) {
    const user = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoinAndSelect('usuario.estacion_trabajo', 'estacion_trabajo')
      .innerJoinAndSelect('estacion_trabajo.seccion', 'seccion')
      .where('seccion.descripcion = :term', { term })
      .getMany();

    return user;
  }

  async findAVGByProfessional(id: string) {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 14);
    limitDate.setHours(0, 0, 0, 0);

    const promediosPorDia = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .innerJoin('usuario.agendamiento', 'agendamiento')
      .innerJoin('agendamiento.consulta', 'consulta')
      .select([
        'DATE(agendamiento.fecha_agenda) AS dia',
        'AVG(consulta.tiempo_espera) AS tiempo_espera_promedio',
      ])
      .where('usuario.id_usuario = :id', { id })
      .andWhere('agendamiento.fecha_agenda >= :limitDate', { limitDate })
      .andWhere('consulta.hora_inicio IS NOT NULL')
      .groupBy('dia')
      .getRawMany();

    return promediosPorDia.map((item) => ({
      dia: item.dia,
      tiempo_espera_promedio: parseFloat(item.tiempo_espera_promedio) || 0,
    }));
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const user = await this.usuarioRepository.preload({
      id_usuario: id,
      ...updateUsuarioDto,
    });
    if (!user)
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    try {
      await this.usuarioRepository.save(user);
      return user;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async updatePassword(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const { us_password } = updateUsuarioDto;
    const user = await this.usuarioRepository.preload({
      id_usuario: id,
      us_password: bcrypt.hashSync(us_password, 10),
    });
    if (!user)
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    try {
      await this.usuarioRepository.save(user);
      return user;
    } catch (error) {
      this.errorHandleDBException.errorHandleDBException(error);
    }
  }

  async remove(id: string) {
    const deleteUsuario = await this.findOne(id);
    await this.usuarioRepository.remove(deleteUsuario);
  }

  async loginUser(authDto: AuthDto): Promise<any> {
    const { us_user, us_password } = authDto;

    const user = await this.usuarioRepository.findOne({
      where: { us_user },
      select: {
        us_user: true,
        us_password: true,
        us_role: true,
        id_usuario: true,
        us_isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales no válidas');
    }
    if (!user.us_isActive) {
      throw new UnauthorizedException('Usuario no activo');
    }

    const passwordMatch = await bcrypt.compareSync(
      us_password,
      user.us_password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales no válidas');
    }

    return {
      user: {
        id_usuario: user.id_usuario,
        us_isActive: user.us_isActive,
        us_user: user.us_user,
        us_role: user.us_role,
      },
      token: this.getJwtToken({ id_usuario: user.id_usuario }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async checkStatus(user: Usuario) {
    return {
      user: {
        id_usuario: user.id_usuario,
        us_isActive: user.us_isActive,
        us_user: user.us_user,
        us_role: user.us_role,
      },
      token: this.getJwtToken({ id_usuario: user.id_usuario }),
    };
  }
}
