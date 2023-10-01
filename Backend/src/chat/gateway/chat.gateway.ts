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
handleMessage(socket:Socket,message:string){
  const chat:Chat = {
    text:message,
    username:"veljkovv"
  }
  this.chatService.createMessage(chat);
this.server.emit('newMessage',message);
}
@SubscribeMessage('getMessages')
async handleGetMessage(socket:Socket,message:string){
  try {
    const messages = await this.chatService.getMessages();
    socket.emit('allMessages', messages); // Emitujte poruke klijentu
  } catch (error) {
    // Obradite greške i obavestite klijenta ako je potrebno
    console.error(error);
    socket.emit('error', 'Failed to retrieve messages');
  }
}
}



// export class AppGateway
//  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//  constructor(private chatService: ChatService) {}
 
//  @WebSocketServer() server: Server;
 
//  @SubscribeMessage('sendMessage')
//  async handleSendMessage(client: Socket, payload: Chat): Promise<void> {
//    //await this.appService.createMessage(payload);
//    this.server.emit('recMessage', payload);
//  }
 
//  afterInit(server: Server) {
//    console.log(server);
//    //Do stuffs
//  }
 
//  handleDisconnect(client: Socket) {
//    console.log(`Disconnected: ${client.id}`);
//    //Do stuffs
//  }
 
//  handleConnection(client: Socket, ...args: any[]) {
//    console.log(`Connected ${client.id}`);
//    //Do stuffs
//  }
//}