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

@WebSocketGateway({ cors: true })
export class AgendamientosWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly agendamientosWsService: AgendamientosWsService,
    private readonly jwtService: JwtService,
  ) {}

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

    console.log(
      'Nro. Usuarios conectados:',
      this.agendamientosWsService.getConnectedClients().length,
      this.agendamientosWsService.getConnectedClients(),
    );
  }

  handleDisconnect(client: Socket) {
    this.agendamientosWsService.removeClient(client.id);
    console.log(
      'Nro. Usuarios conectados:',
      this.agendamientosWsService.getConnectedClients().length,
      this.agendamientosWsService.getConnectedClients(),
    );
  }

  sendAgendamiento(agendamiento) {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const appointmentDate = agendamiento.fecha_consulta;

    if (dateString === appointmentDate) {
      const userId = agendamiento.usuario;

      const clients = this.agendamientosWsService.getClientByUserId(userId);
      console.log(clients);

      clients.forEach((client) => {
        if (client && client.socket.connected) {
          client.socket.emit('agendamiento', agendamiento);
        }
      });
    }
  }
}
