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

  @Get('searchByCI/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.agendamientoService.findOne(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Agendador)
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
