import { BadRequestException, Injectable } from '@nestjs/common';
import { IUser } from 'src/user/models/user.interface';
import { UserService } from 'src/user/services/user.service';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request,Get } from '@nestjs/common';
@Injectable()
export class AuthService {
    constructor(private userService:UserService, private jwtService:JwtService
    )
    {

    }
    async validateUser(username:string,password:string):Promise<any>
    {
        const user = await this.userService.findUserByUsername(username);
        
        if(!user)throw new BadRequestException();

        if(!bcrypt.compare(password,user.password))
        throw new UnauthorizedException();
        // if(user.password!=password)
        // throw new UnauthorizedException();
        return user;
    }
    async generateToken(user: any):Promise<any> {
        return {
            access_token: this.jwtService.sign({
                name: user.name,
                sub: user.id,
            })
        };
    }
}
