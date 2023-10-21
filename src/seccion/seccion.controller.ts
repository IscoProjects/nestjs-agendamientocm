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

@Controller('section')
export class SeccionController {
  constructor(private readonly seccionService: SeccionService) {}

  @Post('create')
  @Auth(UserRoles.Administrador)
  create(@Body() createSeccionDto: CreateSeccionDto) {
    return this.seccionService.create(createSeccionDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll() {
    return this.seccionService.findAll();
  }

  @Get('listEnabled')
  @Auth(UserRoles.Agendador, UserRoles.Administrador)
  findSeccionAndPol() {
    return this.seccionService.findSeccionAndPolEnabled();
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.seccionService.findOne(term);
  }

  @Get('searchByArea/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findByArea(@Param('term') term: string) {
    return this.seccionService.findByArea(term);
  }

  @Get('avgWaitingTime/:days')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  getAvgWaitingTimeBySeccion(@Param('days') days: number) {
    return this.seccionService.getAvgWaitingTimeBySeccion(days);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Administrador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSeccionDto: UpdateSeccionDto,
  ) {
    return this.seccionService.update(id, updateSeccionDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.seccionService.remove(id);
  }
}
