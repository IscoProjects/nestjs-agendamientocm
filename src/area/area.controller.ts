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
import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import { Auth } from 'src/usuario/decorators/auth.decorator';

@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post('registrar')
  @Auth(UserRoles.Administrador)
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @Get('areas-metadata')
  @Auth(UserRoles.Administrador)
  findAllMetadata() {
    return this.areaService.findAllMetadata();
  }

  @Get('listar')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll() {
    return this.areaService.findAll();
  }

  @Get('buscar/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.areaService.findOne(term);
  }

  @Patch('actualizar/:id')
  @Auth(UserRoles.Administrador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areaService.update(id, updateAreaDto);
  }

  @Delete('eliminar/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.areaService.remove(id);
  }
}