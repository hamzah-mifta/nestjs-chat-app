import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrivateMessageDto } from './dto/emit/private-message.dto';
import {
  EVENT_BROADCAST_MESSAGE,
  EVENT_PRIVATE_MESSAGE,
} from 'src/constant/chat-event';
import { BroadcastMessageDto } from './dto/emit/broadcast-message.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  // TO DO: implement this using cache
  private userSocketMap = new Map<string, string>(); // user._id -> socketId

  // store user id and socket id to userSocketMap
  storeSocketId(userId: string, socketId: string) {
    // TO DO: implement this using cache
    this.userSocketMap.set(userId, socketId);
    console.log(`Stored socket ${socketId} for user ${userId}`);
    console.log(`List of sockets: ${Array.from(this.userSocketMap)}`);
  }

  // get socket by user id
  getSocketIdByUserId(userId: string): string | undefined {
    return this.userSocketMap.get(userId);
  }

  // get user id from socket map
  getUserIdFromSocket(socket: Socket): string | undefined {
    for (const [userId, socketId] of this.userSocketMap.entries()) {
      if (socketId === socket.id) return userId;
    }
    return undefined;
  }

  handleConnection(socket: Socket) {
    console.log('Client connected: ', socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log('Client disconnected: ', socket.id);

    // TO DO: implement this using cache
    // Remove socket from map if necessary
    for (const [userId, socketId] of this.userSocketMap.entries()) {
      if (socketId === socket.id) {
        this.userSocketMap.delete(userId);
        console.log(`Client disconnected: ${socket.id} (User ID: ${userId})`);
        break;
      }
    }
  }

  // emit broadcast message
  sendBroadcastMessage(payload: BroadcastMessageDto) {
    this.server.emit(EVENT_BROADCAST_MESSAGE, payload);
  }

  // emit private message
  sendPrivateMessage(payload: PrivateMessageDto) {
    const recipientSocketId = this.getSocketIdByUserId(payload.recipientId);
    if (!recipientSocketId) {
      console.log(`User ${payload.recipientId} is not connected`);
      return;
    }

    this.server.to(recipientSocketId).emit(EVENT_PRIVATE_MESSAGE, payload);
    console.log(`Message sent to ${payload.recipientId}`);
  }
}
