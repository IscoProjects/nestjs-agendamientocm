import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { Paciente } from './entities/paciente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Paciente]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class PacienteModule {}
