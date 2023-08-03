import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { IUser } from '../models/user.interface';
import { Observable,from } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository:Repository<UserEntity>){}

    register(user:IUser):Observable<IUser>{
        return from(this.userRepository.save(user));
    }

    async findUserByUsername(username: string): Promise<IUser | null> {
        const user = await this.userRepository.findOne({ where: { username } });
        return user ? user : null;
      }
}
