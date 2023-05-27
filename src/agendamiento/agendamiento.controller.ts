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

  @Post('register')
  @Auth(UserRoles.Agendador)
  create(@Body() createAgendamientoDto: CreateAgendamientoDto) {
    return this.agendamientoService.create(createAgendamientoDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.agendamientoService.findAll(paginationDto);
  }

  @Get('searchByID/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOneCi(@Param('term', ParseUUIDPipe) term: string) {
    return this.agendamientoService.findOneByID(term);
  }

  @Get('searchByCI/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOneID(@Param('term') term: string) {
    return this.agendamientoService.findOneByCI(term);
  }

  @Get('searchByArea/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findByArea(@Param('term') term: string) {
    return this.agendamientoService.findAllByArea(term);
  }

  @Get('searchBySeccion/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findBySeccion(@Param('term') term: string) {
    return this.agendamientoService.findAllBySeccion(term);
  }

  @Get('searchByPolAndDate/:term/:date')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findByPolAndDate(@Param('term') term: string, @Param('date') date: string) {
    return this.agendamientoService.findByPolAndDate(term, date);
  }

  @Get('searchAllByPol/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllByPol(@Param('term') term: string) {
    return this.agendamientoService.findAllByPol(term);
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
