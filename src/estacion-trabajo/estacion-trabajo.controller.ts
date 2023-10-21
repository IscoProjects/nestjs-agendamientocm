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

@Controller('workstation')
export class EstacionTrabajoController {
  constructor(
    private readonly estacionTrabajoService: EstacionTrabajoService,
  ) {}

  @Post('create')
  @Auth(UserRoles.Administrador)
  create(@Body() createEstacionTrabajoDto: CreateEstacionTrabajoDto) {
    return this.estacionTrabajoService.create(createEstacionTrabajoDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll() {
    return this.estacionTrabajoService.findAll();
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.estacionTrabajoService.findOne(term);
  }

  @Get('searchBySection/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllBySection(@Param('term') term: string) {
    return this.estacionTrabajoService.findAllBySection(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Administrador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEstacionTrabajoDto: UpdateEstacionTrabajoDto,
  ) {
    return this.estacionTrabajoService.update(id, updateEstacionTrabajoDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.estacionTrabajoService.remove(id);
  }
}
