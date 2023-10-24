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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paciente } from './entities/paciente.entity';

@ApiTags('Patient')
@ApiBearerAuth()
@Controller('patient')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post('create')
  @Auth(UserRoles.Agendador)
  @ApiOperation({
    summary: 'Create a new patient',
    description: 'Crear un nuevo paciente',
  })
  @ApiResponse({
    status: 201,
    description: 'Patient was created',
    type: Paciente,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacienteService.create(createPacienteDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all patients',
    description: 'Obtener todos los pacientes',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [Paciente],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pacienteService.findAll(paginationDto);
  }

  @Get('metadata/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get patient metadata by ID or CI',
    description: 'Obtener metadata de paciente por ID o CI',
  })
  @ApiParam({
    name: 'term',
    description: 'Patient ID or CI',
    example: '0605040302',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findPatientInformation(@Param('term') term: string) {
    return this.pacienteService.findPatientInformation(term);
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get Patient by ID or CI',
    description: 'Obtener un paciente por ID o CI',
  })
  @ApiParam({
    name: 'term',
    description: 'Patient ID or CI',
    example: '0605040302',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Paciente,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('term') term: string) {
    return this.pacienteService.findOne(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Agendador)
  @ApiOperation({
    summary: 'Update Patient by ID',
    description: 'Actualizar un paciente por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Patient ID',
    example: 'ebe66d23-e4ab-4f31-a410-e60223c2f27f',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Paciente,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacienteService.update(id, updatePacienteDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Agendador)
  @ApiOperation({
    summary: 'Delete Patient by ID',
    description: 'Eliminar un paciente por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Patient ID',
    example: 'ebe66d23-e4ab-4f31-a410-e60223c2f27f',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pacienteService.remove(id);
  }
}
