import { OnGatewayConnection, SubscribeMessage, WebSocketGateway,WebSocketServer,OnGatewayDisconnect } from '@nestjs/websockets';
import { Server,Socket } from 'socket.io';

@WebSocketGateway({cors:{origin:['http://localhost:4200']}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
@WebSocketServer()
server:Server
handleConnection(client: any, ...args: any[]) {
  console.log('connection made');
}
handleDisconnect(){
  console.log('disconnected');
}
@SubscribeMessage('sendMessage')
handleMessage(socket:Socket,message:string){
this.server.emit('newMessage',message);
}
}
