import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { Auth } from 'src/usuario/decorators/auth.decorator';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Query } from '@nestjs/common/decorators';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';

@Controller('agendamiento')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Post('registrar')
  // @Auth(UserRoles.Agendador)
  create(@Body() createAgendamientoDto: CreateAgendamientoDto) {
    return this.agendamientoService.create(createAgendamientoDto);
  }

  @Get('listar')
  // @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.agendamientoService.findAll(paginationDto);
  }

  @Get('buscarPorSeccion&Fechas/:seccion/:startDate/:endDate')
  // @Auth(UserRoles.Agendador, UserRoles.Administrador)
  findByDateRange(
    @Param('seccion') seccion: string,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.agendamientoService.findByDateRange(
      seccion,
      startDate,
      endDate,
    );
  }

  @Get('buscarPorID/:term')
  // @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOneByID(@Param('term', ParseUUIDPipe) term: string) {
    return this.agendamientoService.findOneByID(term);
  }

  @Get('buscarPorCI/:term')
  // @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOneByCi(@Param('term') term: string) {
    return this.agendamientoService.findOneByCI(term);
  }

  @Get('buscarPorArea/:term')
  // @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findByArea(@Param('term') term: string) {
    return this.agendamientoService.findAllByArea(term);
  }

  @Get('buscarPorSeccion/:term')
  // @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findBySeccion(@Param('term') term: string) {
    return this.agendamientoService.findAllBySeccion(term);
  }

  @Get('buscarPorEstacion&Fecha/:term/:date')
  // @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findByPolAndDate(@Param('term') term: string, @Param('date') date: string) {
    return this.agendamientoService.findByPolAndDate(term, date);
  }

  @Get('buscarPorEstacion/:term')
  // @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllByPol(@Param('term') term: string) {
    return this.agendamientoService.findAllByPol(term);
  }

  @Patch('actualizar/:id')
  // @Auth(UserRoles.Agendador, UserRoles.Medico)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAgendamientoDto: UpdateAgendamientoDto,
  ) {
    return this.agendamientoService.update(id, updateAgendamientoDto);
  }

  @Delete('eliminar/:id')
  // @Auth(UserRoles.Agendador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.agendamientoService.remove(id);
  }
}
