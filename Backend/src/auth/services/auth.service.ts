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

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async generateToken(user: any):Promise<any> {
        return {
            access_token: this.jwtService.sign({
                name: user.name,
                surname:user.surname,
                year:user.year,
                course:user.course,
                sub: user.id,
            })
        };
    }
}
