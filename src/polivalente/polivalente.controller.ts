import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PolivalenteService } from './polivalente.service';
import { CreatePolivalenteDto } from './dto/create-polivalente.dto';
import { UpdatePolivalenteDto } from './dto/update-polivalente.dto';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';
import { Auth } from 'src/usuario/decorators/auth.decorator';

@Controller('polivalente')
export class PolivalenteController {
  constructor(private readonly polivalenteService: PolivalenteService) {}

  @Post('register')
  @Auth(UserRoles.Administrador)
  create(@Body() createPolivalenteDto: CreatePolivalenteDto) {
    return this.polivalenteService.create(createPolivalenteDto);
  }

  @Get('list')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAll() {
    return this.polivalenteService.findAll();
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.polivalenteService.findOne(term);
  }

  @Get('searchBySection/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllBySection(@Param('term') term: string) {
    return this.polivalenteService.findAllBySection(term);
  }

  @Get('searchBySectionAndDate/:term/:date')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAllBySectionAndDate(
    @Param('term') term: string,
    @Param('date') date: string,
  ) {
    return this.polivalenteService.findAllBySectionAndDate(term, date);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Administrador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePolivalenteDto: UpdatePolivalenteDto,
  ) {
    return this.polivalenteService.update(id, updatePolivalenteDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.polivalenteService.remove(id);
  }
}
