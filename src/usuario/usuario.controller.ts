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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './decorators/auth.decorator';
import { UserRoles } from './interfaces/user-roles.interface';
import { GetUser } from './decorators/get-user.decorator';
import { Usuario } from './entities/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.usuarioService.loginUser(authDto);
  }

  @Post('register')
  // @Auth(UserRoles.Administrador)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get('list')
  @Auth(UserRoles.Administrador, UserRoles.Agendador)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usuarioService.findAll(paginationDto);
  }

  @Get('status-verify')
  @Auth()
  checkAuthStatus(@GetUser() user: Usuario) {
    return this.usuarioService.checkStatus(user);
  }

  @Get('search/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador)
  findOne(@Param('term') term: string) {
    return this.usuarioService.findOne(term);
  }

  @Patch('update/:id')
  @Auth(UserRoles.Administrador)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.remove(id);
  }
}
