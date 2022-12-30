import { Module } from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { AgendamientoController } from './agendamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamiento } from './entities/agendamiento.entity';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [AgendamientoController],
  providers: [AgendamientoService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Agendamiento]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class AgendamientoModule {}
