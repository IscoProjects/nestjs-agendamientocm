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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AVGDayResponse, LoginResponse } from './interfaces/api-response';

@ApiTags('Professional')
@ApiBearerAuth()
@Controller('professional')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Login user',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful login',
    type: LoginResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() authDto: AuthDto) {
    return this.usuarioService.loginUser(authDto);
  }

  @Post('create')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Create a new user (professional)',
    description: 'Crear un nuevo usuario (profesional)',
  })
  @ApiResponse({
    status: 201,
    description: 'User was created',
    type: Usuario,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get('metadata')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Get users metadata',
    description: 'Obtener metadata de los usuarios',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAllAssignmentsInformationFromUsers() {
    return this.usuarioService.findAllAssignmentsInformationFromUsers();
  }

  @Get('list')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get all users',
    description: 'Obtener todos los usuarios',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: [Usuario],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('search/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get a user by ID or CI',
    description: 'Obtener un usuario por ID o CI',
  })
  @ApiParam({
    name: 'term',
    description: 'User ID or User CI',
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Usuario,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findOne(@Param('term') term: string) {
    return this.usuarioService.findOne(term);
  }

  @Get('searchBySection/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get users by Section Description',
    description: 'Obtener usuarios por la descripción de la Sección',
  })
  @ApiParam({
    name: 'term',
    description: 'Section Description',
    example: 'Medicina General',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findBySection(@Param('term') term: string) {
    return this.usuarioService.findBySection(term);
  }

  @Get('avgWaitingTime/:id')
  @Auth(UserRoles.Agendador, UserRoles.Administrador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Get the average waiting time by User ID',
    description: 'Obtener el tiempo de espera promedio por ID de Usuario',
  })
  @ApiParam({
    name: 'id',
    description: 'Professional ID',
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: AVGDayResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAVGByProfessional(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.findAVGByProfessional(id);
  }

  @Get('user-verify/:term')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Verify if a Professional exists by user alias',
    description: 'Verificar si un Profesional existe por su alias de usuario',
  })
  @ApiParam({
    name: 'term',
    description: 'Professional user (alias)',
    example: 'medico1',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Usuario,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  findUser(@Param('term') term: string) {
    return this.usuarioService.findUser(term);
  }

  //Token

  @Get('status-verify')
  @Auth()
  @ApiOperation({
    summary: 'Verify Authorization and Authentication of a Professional',
    description: 'Verificar la autorización y autenticación de un Profesional',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: LoginResponse,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  checkAuthStatus(@GetUser() user: Usuario) {
    return this.usuarioService.checkStatus(user);
  }

  //Token

  @Patch('update/:id')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Update an user by its ID',
    description: 'Actualizar un usuario por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: Usuario,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Patch('update-password/:id')
  @Auth(UserRoles.Administrador, UserRoles.Agendador, UserRoles.Medico)
  @ApiOperation({
    summary: 'Update an user password by its ID',
    description: 'Actualizar la contraseña de usuario por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuarioService.updatePassword(id, updateUsuarioDto);
  }

  @Delete('delete/:id')
  @Auth(UserRoles.Administrador)
  @ApiOperation({
    summary: 'Delete an user by its ID',
    description: 'Eliminar un usuario por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '2fd386f9-8521-40d4-babe-800fa6a66558',
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuarioService.remove(id);
  }
}
