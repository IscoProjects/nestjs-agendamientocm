import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/usuario/decorators/auth.decorator';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import { AreaTrabajoService } from './area_trabajo.service';
import { CreateAreaTrabajoDto } from './dto/create-area_trabajo.dto';
import { UpdateAreaTrabajoDto } from './dto/update-area_trabajo.dto';

@Controller('area-trabajo')
export class AreaTrabajoController {
  constructor(private readonly areaTrabajoService: AreaTrabajoService) {}

  @Post('register')
  @Auth(UserRoles.Administrador)
  create(@Body() createAreaTrabajoDto: CreateAreaTrabajoDto) {
    return this.areaTrabajoService.create(createAreaTrabajoDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll() {
    return this.areaTrabajoService.findAll();
  }

  @Get('list-metadata')
  @Auth(UserRoles.Administrador)
  findAreasMetadata() {
    return this.areaTrabajoService.findAreasMetadata();
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.areaTrabajoService.findOne(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Administrador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAreaTrabajoDto: UpdateAreaTrabajoDto,
  ) {
    return this.areaTrabajoService.update(id, updateAreaTrabajoDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.areaTrabajoService.remove(id);
  }
}
