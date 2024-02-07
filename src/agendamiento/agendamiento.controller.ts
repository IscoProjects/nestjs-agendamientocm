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
import { AgendamientoService } from './agendamiento.service';
import { Auth } from 'src/usuario/decorators/auth.decorator';
import { CreateAgendamientoDto } from './dto/create-agendamiento.dto';
import { UpdateAgendamientoDto } from './dto/update-agendamiento.dto';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Agendamiento } from './entities/agendamiento.entity';
import { AVGDayResponse } from 'src/usuario/interfaces/api-response';

@ApiTags('Scheduling')
@ApiBearerAuth()
@Controller('scheduling')
export class AgendamientoController {
  constructor(private readonly agendamientoService: AgendamientoService) {}

  @Post('create')
  @Auth(UserRoles.Agendador)
  @ApiOperation({
    summary: 'Create a new schedule',
    description: 'Crear un nuevo agendamiento.',
  })
  @ApiResponse({
    status: 201,
    description: 'Scheduling was created',
    type: Agendamiento,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createAgendamientoDto: CreateAgendamientoDto) {
    return this.agendamientoService.create(createAgendamientoDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all schedules',
    description: 'Obtener todos los agendamientos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [Agendamiento],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    return this.agendamientoService.findAll();
  }

  @Get('searchByID/:id')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get a schedule by ID',
    description: 'Obtener un agendamiento por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Schedule ID',
    example: '44cb3359-270a-483b-8011-23bc75b0b2de',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Agendamiento,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOneByID(@Param('id', ParseUUIDPipe) id: string) {
    return this.agendamientoService.findOneByID(id);
  }

  @Get('searchByProfessional/:id')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all schedules by Professional ID',
    description: 'Obtener todos los agendamientos por Profesional ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Professional ID',
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAllByProfessional(@Param('id', ParseUUIDPipe) id: string) {
    return this.agendamientoService.findAllByProfessional(id);
  }

  @Get('searchByProfessional&Date/:id/:date')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all schedules by Professional ID on a specific date',
    description:
      'Obtener todos los agendamientos por Profesional ID en una fecha específica',
  })
  @ApiParam({
    name: 'id',
    description: 'Professional ID',
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
  })
  @ApiParam({
    name: 'date',
    description: 'Date',
    example: '2023-10-25',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findByProfessionalAndDate(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('date') date: string,
  ) {
    return this.agendamientoService.findByProfessionalAndDate(id, date);
  }

  @Get('searchByProfessional&Dates/:id/:startDate/:endDate')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all schedules by Profesional and dates',
    description: 'Obtener todos los agendamientos por profesional y fechas',
  })
  @ApiParam({
    name: 'id',
    description: 'Professional ID',
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
  })
  @ApiParam({
    name: 'startDate',
    description: 'Start Date',
    example: '2023-10-25',
  })
  @ApiParam({
    name: 'endDate',
    description: 'End Date',
    example: '2023-10-26',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAllByPol(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.agendamientoService.findAllByProfessionalAndDates(
      id,
      startDate,
      endDate,
    );
  }

  @Get('searchByDates/:startDate/:endDate')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all schedules between dates',
    description: 'Obtener todos los agendamientos entre fechas',
  })
  @ApiParam({
    name: 'startDate',
    description: 'Start Date',
    example: '2023-10-25',
  })
  @ApiParam({
    name: 'endDate',
    description: 'End Date',
    example: '2023-10-26',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findBetweenDates(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
  ) {
    return this.agendamientoService.findBetweenDates(startDate, endDate);
  }

  @Get('avgWaitingTime/:days')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get the average waiting time of schedules per day.',
    description:
      'Obtener el tiempo de espera promedio de los agendamientos por día',
  })
  @ApiParam({
    name: 'days',
    description: 'Number of days',
    example: '7',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: AVGDayResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getAVGWaitingTime(@Param('days') days: number) {
    return this.agendamientoService.getAVGWaitingTime(days);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Update a schedule by its ID',
    description: 'Actualizar un agendamiento por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Schedule ID',
    example: '44cb3359-270a-483b-8011-23bc75b0b2de',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Agendamiento,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAgendamientoDto: UpdateAgendamientoDto,
  ) {
    return this.agendamientoService.update(id, updateAgendamientoDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Agendador)
  @ApiOperation({
    summary: 'Delete a schedule by its ID',
    description: 'Eliminar un agendamiento por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Schedule ID',
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
    return this.agendamientoService.remove(id);
  }
}
