import { Module } from '@nestjs/common';
import { AgendamientosWsService } from './agendamientos-ws.service';
import { AgendamientosWsGateway } from './agendamientos-ws.gateway';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  providers: [AgendamientosWsGateway, AgendamientosWsService],
  imports: [UsuarioModule],
  exports: [],
})
export class AgendamientosWsModule {}
