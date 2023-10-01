import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './models/chat.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature( [ChatEntity]),
    
  ],
  providers: [ChatGateway, ChatService]
})
export class ChatModule {}
