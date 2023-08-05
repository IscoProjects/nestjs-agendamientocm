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
import { EstacionTrabajoService } from './estacion-trabajo.service';
import { CreateEstacionTrabajoDto } from './dto/create-estacion-trabajo.dto';
import { UpdateEstacionTrabajoDto } from './dto/update-estacion-trabajo.dto';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import { Auth } from 'src/usuario/decorators/auth.decorator';

@Controller('estacion-trabajo')
export class EstacionTrabajoController {
  constructor(
    private readonly estacionTrabajoService: EstacionTrabajoService,
  ) {}

  @Post('registrar')
  @Auth(UserRoles.Administrador)
  create(@Body() createEstacionTrabajoDto: CreateEstacionTrabajoDto) {
    return this.estacionTrabajoService.create(createEstacionTrabajoDto);
  }

  @Get('listar')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll() {
    return this.estacionTrabajoService.findAll();
  }

  @Get('buscar/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.estacionTrabajoService.findOne(term);
  }

  @Get('buscarPorSeccion/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllBySection(@Param('term') term: string) {
    return this.estacionTrabajoService.findAllBySection(term);
  }

  @Get('buscarPorSeccion&Fecha/:term/:date')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllBySectionAndDate(
    @Param('term') term: string,
    @Param('date') date: string,
  ) {
    return this.estacionTrabajoService.findAllBySectionAndDate(term, date);
  }

  @Patch('actualizar/:id')
  @Auth(UserRoles.Administrador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEstacionTrabajoDto: UpdateEstacionTrabajoDto,
  ) {
    return this.estacionTrabajoService.update(id, updateEstacionTrabajoDto);
  }

  @Delete('eliminar/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.estacionTrabajoService.remove(id);
  }
}
