import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventsService } from './events.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3006, { cors: { origin: '*' } })
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(room);
    client.emit('joinedRoom', `joined room: ${room}`);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.leave(room);
    client.emit('leftRoom', `left room: ${room}`);
  }
}
