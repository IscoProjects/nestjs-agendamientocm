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
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthDto } from './dto/auth.dto';
import { Auth } from './decorators/auth.decorator';
import { UserRoles } from './interfaces/user-roles.interface';
import { GetUser } from './decorators/get-user.decorator';
import { Usuario } from './entities/usuario.entity';

@Controller('professional')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('create')
  @Auth(UserRoles.Administrador)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get('metadata')
  @Auth(UserRoles.Administrador)
  findAllAssignmentsInformationFromUsers() {
    return this.usuarioService.findAllAssignmentsInformationFromUsers();
  }

  @Get('list')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('search/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findOne(@Param('term') term: string) {
    return this.usuarioService.findOne(term);
  }

  @Get('searchBySection/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findBySection(@Param('term') term: string) {
    return this.usuarioService.findBySection(term);
  }

  @Get('avgWaitingTime/:id')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  findAVGByProfessional(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.findAVGByProfessional(id);
  }

  @Get('user-verify/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  findUser(@Param('term') term: string) {
    return this.usuarioService.findUser(term);
  }

  //Token

  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.usuarioService.loginUser(authDto);
  }

  @Get('status-verify')
  @Auth()
  checkAuthStatus(@GetUser() user: Usuario) {
    return this.usuarioService.checkStatus(user);
  }

  //Token

  @Patch('update/:id')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Patch('update-password/:id')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  updatePasswor(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.updatePassword(id, updateUsuarioDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.remove(id);
  }
}
