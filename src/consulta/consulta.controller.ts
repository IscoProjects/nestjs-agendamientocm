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

  @Post('register')
  @Auth(UserRoles.Medico)
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @Get('list')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.consultaService.findAll(paginationDto);
  }

  @Get('searchById/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findOne(@Param('term', ParseUUIDPipe) term: string) {
    return this.consultaService.findOne(term);
  }

  @Get('searchByMed/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findOneByMed(@Param('term', ParseUUIDPipe) term: string) {
    return this.consultaService.findOneByMed(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Medico)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateConsultaDto: UpdateConsultaDto,
  ) {
    return this.consultaService.update(id, updateConsultaDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Medico)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.consultaService.remove(id);
  }
}
