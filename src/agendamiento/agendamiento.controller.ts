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

@Controller('scheduling')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Post('create')
  @Auth(UserRoles.Agendador)
  create(@Body() createAgendamientoDto: CreateAgendamientoDto) {
    return this.agendamientoService.create(createAgendamientoDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.agendamientoService.findAll(paginationDto);
  }

  @Get('searchByID/:id')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOneByID(@Param('id', ParseUUIDPipe) id: string) {
    return this.agendamientoService.findOneByID(id);
  }

  @Get('searchByStation/:station')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllByPol(@Param('station') station: string) {
    return this.agendamientoService.findAllByStation(station);
  }

  @Get('searchByProfessional/:id')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllByProfessional(@Param('id', ParseUUIDPipe) id: string) {
    return this.agendamientoService.findAllByProfessional(id);
  }

  @Get('searchScheduleByProfessional/:id')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findEnabledAgendaByProfessional(@Param('id', ParseUUIDPipe) id: string) {
    return this.agendamientoService.findEnabledAgendaByProfessional(id);
  }

  @Get('searchByProfessional&Date/:id/:date')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findByProfessionalAndDate(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('date') date: string,
  ) {
    return this.agendamientoService.findByProfessionalAndDate(id, date);
  }

  @Get('avgWaitingTime/:days')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  getAVGWaitingTime(@Param('days') days: number) {
    return this.agendamientoService.getAVGWaitingTime(days);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Agendador, UserRoles.Medico)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAgendamientoDto: UpdateAgendamientoDto,
  ) {
    return this.agendamientoService.update(id, updateAgendamientoDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Agendador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.agendamientoService.remove(id);
  }
}
