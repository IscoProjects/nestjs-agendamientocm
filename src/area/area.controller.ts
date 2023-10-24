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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Area } from './entities/area.entity';

@ApiTags('Area')
@ApiBearerAuth()
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Post('create')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Create area',
    description: 'Crear area',
  })
  @ApiResponse({
    status: 201,
    description: 'Area was created',
    type: Area,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areaService.create(createAreaDto);
  }

  @Get('metadata')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Get areas metadata',
    description: 'Obtener metadata de las areas',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAllMetadata() {
    return this.areaService.findAllMetadata();
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all areas',
    description: 'Obtener todas las areas',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [Area],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    return this.areaService.findAll();
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get an area by Area ID',
    description: 'Obtener area por su ID',
  })
  @ApiParam({
    name: 'term',
    description: 'Area ID or Area Description',
    example: 'Medicina externa',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Area,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('term') term: string) {
    return this.areaService.findOne(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Update an area by Area ID',
    description: 'Actualizar area por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Area ID',
    example: '8807af49-769c-475b-9737-deb7af880de8',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Area,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areaService.update(id, updateAreaDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Delete an area by Area ID',
    description: 'Eliminar area por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Area ID',
    example: '8807af49-769c-475b-9737-deb7af880de8',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.areaService.remove(id);
  }
}
