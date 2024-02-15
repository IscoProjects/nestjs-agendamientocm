import { Module } from '@nestjs/common';
import { AgendamientoService } from './agendamiento.service';
import { AgendamientoController } from './agendamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agendamiento } from './entities/agendamiento.entity';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { UsuarioModule } from '../usuario/usuario.module';
import { AgendamientosWsService } from 'src/agendamientos-ws/agendamientos-ws.service';
import { AgendamientosWsModule } from 'src/agendamientos-ws/agendamientos-ws.module';
import { AgendamientosWsGateway } from 'src/agendamientos-ws/agendamientos-ws.gateway';
import { DateTimeService } from 'src/common/services/date-time/date-time.service';

@Module({
  controllers: [AgendamientoController],
  providers: [
    AgendamientoService,
    ErrorHandleDBService,
    AgendamientosWsService,
    AgendamientosWsGateway,
    DateTimeService,
  ],
  imports: [
    TypeOrmModule.forFeature([Agendamiento]),
    UsuarioModule,
    AgendamientosWsModule,
  ],
  exports: [TypeOrmModule],
})
export class AgendamientoModule {}
