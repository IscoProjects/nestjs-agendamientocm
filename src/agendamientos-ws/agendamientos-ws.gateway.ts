import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AgendamientosWsService } from './agendamientos-ws.service';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/usuario/interfaces/jwt-payload.interface';
import * as moment from 'moment-timezone';

@WebSocketGateway({ cors: true })
export class AgendamientosWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly agendamientosWsService: AgendamientosWsService,
    private readonly jwtService: JwtService,
  ) {
    moment.tz.setDefault('America/Guayaquil');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.agendamientosWsService.registerClient(
        client,
        payload.id_usuario,
      );
    } catch (error) {
      client.disconnect();
      return;
    }
  }

  handleDisconnect(client: Socket) {
    this.agendamientosWsService.removeClient(client.id);
  }

  sendAgendamiento(agendamiento) {
    const userId = agendamiento.usuario;
    const client = this.agendamientosWsService.getClientByUserId(userId);

    if (client && client.socket.connected) {
      client.socket.emit('agendamiento', agendamiento);
    }
  }
}
