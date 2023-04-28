import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SeccionService } from './seccion.service';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import { Auth } from 'src/usuario/decorators/auth.decorator';

@Controller('seccion')
export class SeccionController {
  constructor(private readonly seccionService: SeccionService) {}

  @Post('register')
  @Auth(UserRoles.Administrador)
  create(@Body() createSeccionDto: CreateSeccionDto) {
    return this.seccionService.create(createSeccionDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll() {
    return this.seccionService.findAll();
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.seccionService.findOne(term);
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
