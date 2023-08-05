import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeccionService } from './seccion.service';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import { Auth } from 'src/usuario/decorators/auth.decorator';

@Controller('seccion')
export class SeccionController {
  constructor(private readonly seccionService: SeccionService) {}

  @Post('registrar')
  @Auth(UserRoles.Administrador)
  create(@Body() createSeccionDto: CreateSeccionDto) {
    return this.seccionService.create(createSeccionDto);
  }

  @Get('listar')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll() {
    return this.seccionService.findAll();
  }

  @Get('listar-activos')
  @Auth(UserRoles.Agendador, UserRoles.Administrador)
  findSeccionAndPol() {
    return this.seccionService.findSeccionAndPol();
  }

  @Get('buscar/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.seccionService.findOne(term);
  }

  @Get('buscarPorArea/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findByArea(@Param('term') term: string) {
    return this.seccionService.findByArea(term);
  }

  @Patch('actualizar/:id')
  @Auth(UserRoles.Administrador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSeccionDto: UpdateSeccionDto,
  ) {
    return this.seccionService.update(id, updateSeccionDto);
  }

  @Delete('eliminar/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.seccionService.remove(id);
  }
}
