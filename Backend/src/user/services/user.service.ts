import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository } from 'typeorm';
import { IUser } from '../models/user.interface';
import { Observable,catchError,from,map, switchMap, throwError } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/post/models/role.enum';

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
      async getUsersOnSameCourse(course:string):Promise<Observable<IUser[]>>{
        const users$ = from(
            this.userRepository.find({
              where: { course}, 
            }),
          );
      
          return users$;
        }  
        
       async updateUser(id:number,newUser:IUser): Promise<IUser>{
          const existingUser: IUser | undefined = await this.userRepository.findOne({ where: { id } });
          if (!existingUser) {
            throw new NotFoundException(`Korisnik sa ID ${id} nije pronađen.`);
        }
        else 
        {
          existingUser.image=newUser.image;
          return await this.userRepository.save(existingUser);
        }
        }
        updateUserRole(user:IUser):Observable<IUser>{
          return from(
            this.userRepository.findOne({ where: { id: user.id } })
        ).pipe(
            switchMap(existingUser => {
                if (!existingUser) {
                    return throwError(new NotFoundException(`Korisnik sa ID ${user.id} nije pronađen.`));
                }
                if (existingUser.role === Role.USER) {
                    existingUser.role = Role.PREMIUM;
                    return from(this.userRepository.save(existingUser));
                } else {
                    return throwError(new BadRequestException(`Korisnik sa ID ${user.id} već ima ulogu različitu od "user".`));
                }
            }),
            catchError(error => throwError(error))
        );
    }
    
}
