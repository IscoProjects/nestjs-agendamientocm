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
import { PolivalenteService } from './polivalente.service';
import { CreatePolivalenteDto } from './dto/create-polivalente.dto';
import { UpdatePolivalenteDto } from './dto/update-polivalente.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Auth } from 'src/usuario/decorators/auth.decorator';
import { UserRoles } from 'src/usuario/interfaces/user-roles.interface';

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
  findAll(@Query() paginationDto: PaginationDto) {
    return this.polivalenteService.findAll(paginationDto);
  }

  @Get('search/:term')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.polivalenteService.findOne(term);
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
