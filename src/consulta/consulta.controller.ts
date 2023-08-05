import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Auth } from 'src/usuario/decorators/auth.decorator';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';

@Controller('consulta')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post('registrar')
  @Auth(UserRoles.Medico)
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @Get('listar')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.consultaService.findAll(paginationDto);
  }

  @Get('buscarPorID/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findOne(@Param('term', ParseUUIDPipe) term: string) {
    return this.consultaService.findOne(term);
  }

  @Get('buscarPorMedico/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findOneByMed(@Param('term', ParseUUIDPipe) term: string) {
    return this.consultaService.findOneByMed(term);
  }

  @Patch('actualizar/:id')
  @Auth(UserRoles.Medico)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateConsultaDto: UpdateConsultaDto,
  ) {
    return this.consultaService.update(id, updateConsultaDto);
  }

  @Delete('eliminar/:id')
  @Auth(UserRoles.Medico)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.consultaService.remove(id);
  }
}
