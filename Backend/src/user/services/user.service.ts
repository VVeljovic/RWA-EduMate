import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { IUser } from '../models/user.interface';
import { Observable,from } from 'rxjs';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    public readonly userRepository:Repository<UserEntity>){}

    async register(user:IUser):Promise<IUser>{
        const salt =  await bcrypt.genSalt();
         user.password =  await bcrypt.hash(user.password, salt);
        return await (this.userRepository.save(user));
    }

    async findUserByUsername(username: string): Promise<IUser | null> {
        const user = await this.userRepository.findOne({ where: { username } });
        return user ? user : null;
      }
}
