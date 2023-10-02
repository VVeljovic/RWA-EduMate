import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Socket, Server } from 'socket.io';
import { ChatService } from 'src/chat/services/chat.service';
 import { ChatEntity } from '../models/chat.entity';
import { Chat } from '../models/chat.interface';
 @WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200'],
  },
 })
 
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
@WebSocketServer()
server:Server
constructor(private readonly chatService:ChatService){}
handleConnection(client: any, ...args: any[]) {
  console.log('connection made');
}
handleDisconnect(){
  console.log('disconnected');
}
@SubscribeMessage('sendMessage')
handleMessage(socket:Socket,data: { text: string, username: string }){
  console.log(data.text,data.username);
  const chat:Chat = {
    text:data.text,
    username:data.username
  }
 
  this.chatService.createMessage(chat);
this.server.emit('newMessage',data);
}
@SubscribeMessage('getMessages')
async handleGetMessage(socket:Socket,message:string){
  try {
    const messages = await this.chatService.getMessages();
    console.log(messages);
    socket.emit('allMessages', messages); 
  } catch (error) {
   
    console.error(error);
    socket.emit('error', 'Failed to retrieve messages');
  }
}
}



