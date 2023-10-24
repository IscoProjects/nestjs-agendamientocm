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
import { EstacionTrabajoService } from './estacion-trabajo.service';
import { CreateEstacionTrabajoDto } from './dto/create-estacion-trabajo.dto';
import { UpdateEstacionTrabajoDto } from './dto/update-estacion-trabajo.dto';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import { Auth } from 'src/usuario/decorators/auth.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EstacionTrabajo } from './entities/estacion-trabajo.entity';

@ApiTags('Work Station')
@ApiBearerAuth()
@Controller('workstation')
export class EstacionTrabajoController {
  constructor(
    private readonly estacionTrabajoService: EstacionTrabajoService,
  ) {}

  @Post('create')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Create workstation',
    description: 'Crear estacion de trabajo',
  })
  @ApiResponse({
    status: 201,
    description: 'Workstation was created',
    type: EstacionTrabajo,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createEstacionTrabajoDto: CreateEstacionTrabajoDto) {
    return this.estacionTrabajoService.create(createEstacionTrabajoDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all workstations',
    description: 'Obtener todas las estaciones de trabajo',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [EstacionTrabajo],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    return this.estacionTrabajoService.findAll();
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get an workstation by Workstation ID or Workstation description',
    description: 'Obtener una estacion de trabajo por su ID o su descripción',
  })
  @ApiParam({
    name: 'term',
    description: 'Workstation ID or Workstation Description',
    example: 'Polivalente 7',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: EstacionTrabajo,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('term') term: string) {
    return this.estacionTrabajoService.findOne(term);
  }

  @Get('searchBySection/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary:
      'Get all workstations of a Section by Section ID or Section description',
    description:
      'Obtener todas las estaciones de trabajo de una Sección por su Sección ID o su Sección descripción',
  })
  @ApiParam({
    name: 'term',
    description: 'Workstation ID or Workstation Description',
    example: 'Medicina General',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAllBySection(@Param('term') term: string) {
    return this.estacionTrabajoService.findAllBySection(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Update a workstation by its ID',
    description: 'Actualizar una estación de trabajo por su ID',
  })
  @ApiParam({
    name: 'ID',
    description: 'WorkStation ID',
    example: '9235c3a0-dd5a-45c2-9a3d-a77ae33f1604',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: EstacionTrabajo,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEstacionTrabajoDto: UpdateEstacionTrabajoDto,
  ) {
    return this.estacionTrabajoService.update(id, updateEstacionTrabajoDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Delete a workstation by its ID',
    description: 'Eliminar una estación de trabajo por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Workstation ID',
    example: '9235c3a0-dd5a-45c2-9a3d-a77ae33f1604',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.estacionTrabajoService.remove(id);
  }
}
