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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Seccion } from './entities/seccion.entity';
import { AVGSectionResponse } from 'src/usuario/interfaces/api-response';

@ApiTags('Section')
@ApiBearerAuth()
@Controller('section')
export class SeccionController {
  constructor(private readonly seccionService: SeccionService) {}

  @Post('create')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Create a new Section',
    description: 'Crear una nueva sección',
  })
  @ApiResponse({
    status: 201,
    description: 'Scheduling was created',
    type: Seccion,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createSeccionDto: CreateSeccionDto) {
    return this.seccionService.create(createSeccionDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all sections',
    description: 'Obtener todas las secciones',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [Seccion],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    return this.seccionService.findAll();
  }

  @Get('searchEnabled')
  @Auth(UserRoles.Agendador, UserRoles.Administrador)
  @ApiOperation({
    summary: 'Get sections with status equal to true',
    description: 'Obtener secciones con estatus igual a true',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [Seccion],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findSeccionAndPol() {
    return this.seccionService.findSeccionAndPolEnabled();
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get a section by ID or Description',
    description: 'Obtener una sección por ID o Descripción',
  })
  @ApiParam({
    name: 'term',
    description: 'Section ID or Description',
    example: 'dbf763d7-86c0-43d9-b335-307aacb38f5d',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Seccion,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('term') term: string) {
    return this.seccionService.findOne(term);
  }

  @Get('searchByArea/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get sections by Area ID or Area Description',
    description: 'Obtener secciones por Área ID o Área Descripción',
  })
  @ApiParam({
    name: 'term',
    description: 'Area ID or Area Description',
    example: 'Medicina Externa',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findByArea(@Param('term') term: string) {
    return this.seccionService.findByArea(term);
  }

  @Get('avgWaitingTime/:days')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get the average waiting time of schedules by section',
    description:
      'Obtener el tiempo de espera promedio de los agendamientos por sección',
  })
  @ApiParam({
    name: 'days',
    description: 'Number of days',
    example: '7',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: AVGSectionResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getAvgWaitingTimeBySeccion(@Param('days') days: number) {
    return this.seccionService.getAvgWaitingTimeBySeccion(days);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Update a section by ID',
    description: 'Actualizar una sección por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Section ID',
    example: 'dbf763d7-86c0-43d9-b335-307aacb38f5d',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Seccion,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSeccionDto: UpdateSeccionDto,
  ) {
    return this.seccionService.update(id, updateSeccionDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Delete a section by ID',
    description: 'Eliminar una sección por ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Section ID',
    example: 'dbf763d7-86c0-43d9-b335-307aacb38f5d',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.seccionService.remove(id);
  }
}
