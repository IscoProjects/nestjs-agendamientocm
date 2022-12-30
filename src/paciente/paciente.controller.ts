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
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/usuario/decorators/auth.decorator';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';

@Controller('paciente')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post('register')
  @Auth(UserRoles.Agendador)
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pacienteService.findAll(paginationDto);
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.pacienteService.findOne(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Agendador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacienteService.update(id, updatePacienteDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Agendador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pacienteService.remove(id);
  }
}
