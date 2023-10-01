import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from '../models/chat.entity';
import { Chat } from '../models/chat.interface';

@Injectable()
export class ChatService {
    constructor(@InjectRepository(ChatEntity) private chatRepository:Repository<ChatEntity>){}
    async createMessage(chat:Chat):Promise<Chat>{
        return await this.chatRepository.save(chat);
    }
    async getMessages():Promise<Chat[]>{
        return await this.chatRepository.find();
    }

}
