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
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Auth } from 'src/usuario/decorators/auth.decorator';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Consulta } from './entities/consulta.entity';

@ApiTags('Medical Appointment')
@ApiBearerAuth()
@Controller('appointment')
export class ConsultaController {
  constructor(private readonly consultaService: ConsultaService) {}

  @Post('create')
  @Auth(UserRoles.Medico)
  @ApiOperation({
    summary: 'Create a new medical appointment registration',
    description: 'Crear nuevo registro de cita medica',
  })
  @ApiResponse({
    status: 201,
    description: 'Medical appointment was created',
    type: Consulta,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createConsultaDto: CreateConsultaDto) {
    return this.consultaService.create(createConsultaDto);
  }

  @Get('list')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all medical appointments',
    description: 'Obtener todos los registros de citas medicas',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [Consulta],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    return this.consultaService.findAll();
  }

  @Get('search/:id')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get a medical appointment by ID',
    description: 'Obtener un registro de cita medica por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Medical appointment ID',
    example: '44cb3359-270a-483b-8011-23bc75b0b2de',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Consulta,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.consultaService.findOne(id);
  }

  @Get('searchByProfessional/:id')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get a medical appointment by Professional ID',
    description: 'Obtener un registro de cita medica por Profesional ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Professional ID',
    example: '4b720a22-5e2a-40d8-8ad7-299b7d570967',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [Consulta],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOneByMed(@Param('id', ParseUUIDPipe) id: string) {
    return this.consultaService.findOneByProfessional(id);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Medico)
  @ApiOperation({
    summary: 'Update a medical appointment by ID',
    description: 'Actualizar un registro de cita medica por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Medical appointment ID',
    example: '44cb3359-270a-483b-8011-23bc75b0b2de',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Consulta,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateConsultaDto: UpdateConsultaDto,
  ) {
    return this.consultaService.update(id, updateConsultaDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Medico)
  @ApiOperation({
    summary: 'Delete a medical appointment by ID',
    description: 'Eliminar un registro de cita medica por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Medical appointment ID',
    example: '44cb3359-270a-483b-8011-23bc75b0b2de',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.consultaService.remove(id);
  }
}
