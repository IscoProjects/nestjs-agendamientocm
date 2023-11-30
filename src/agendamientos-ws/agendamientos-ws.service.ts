import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Repository } from 'typeorm';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    id_usuario: string;
  };
}

@Injectable()
export class AgendamientosWsService {
  private connectedClients: ConnectedClients = {};
  private userIdToClientId: { [id_usuario: string]: string } = {};

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.usuarioRepository.findOneBy({ id_usuario: userId });

    if (!user) {
      throw new Error('El usuario no existe');
    }
    if (!user.us_isActive) {
      throw new Error('El usuario no está activo');
    }

    this.connectedClients[client.id] = {
      socket: client,
      id_usuario: user.id_usuario,
    };

    this.connectedClients[client.id] = {
      socket: client,
      id_usuario: user.id_usuario,
    };

    this.userIdToClientId[user.id_usuario] = client.id;
  }

  removeClient(clientId: string) {
    const client = this.connectedClients[clientId];

    if (client) {
      delete this.userIdToClientId[client.id_usuario];
    }
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): string[] {
    return Object.keys(this.connectedClients);
  }

  getClientById(clientId: string) {
    return this.connectedClients[clientId];
  }

  getClientByUserId(id_usuario: string) {
    const clientId = this.userIdToClientId[id_usuario];
    return this.connectedClients[clientId];
  }
}
