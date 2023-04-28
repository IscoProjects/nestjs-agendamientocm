import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { validate as isUUID } from 'uuid';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
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

  async findAll(paginationDto: PaginationDto) {
    const { limit = 25, offset = 0 } = paginationDto;

    return this.usuarioRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(term: string) {
    let user: Usuario;

    if (isUUID(term)) {
      user = await this.usuarioRepository.findOne({
        where: {
          id_usuario: term,
        },
        relations: {
          polivalente: true,
        },
      });
    } else {
      const queryBuilder = this.usuarioRepository.createQueryBuilder('user');
      user = await queryBuilder
        .leftJoinAndSelect('user.polivalente', 'polivalente')
        .where('us_cedula=:us_cedula', {
          us_cedula: term,
        })
        .getOne();
    }

    if (!user)
      throw new NotFoundException(`Usuario con ID: ${term} no encontrado`);
    return user;
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

  async remove(id: string) {
    const deleteUsuario = await this.findOne(id);
    await this.usuarioRepository.remove(deleteUsuario);
  }

  async loginUser(authDto: AuthDto) {
    const { us_user, us_password } = authDto;

    const user = await this.usuarioRepository.findOne({
      where: { us_user },
      select: {
        us_user: true,
        us_password: true,
        us_role: true,
        id_usuario: true,
        polivalente: {
          pol_descripcion: true,
        },
      },
      relations: {
        polivalente: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    if (!bcrypt.compareSync(us_password, user.us_password)) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return {
      ok: true,
      ...user,
      token: this.getJwtToken({ id_usuario: user.id_usuario }),
    };
  }

  async checkStatus(user: Usuario) {
    return {
      ok: true,
      ...user,
      token: this.getJwtToken({ id_usuario: user.id_usuario }),
    };
  }

  private getJwtToken(payload: IJwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
