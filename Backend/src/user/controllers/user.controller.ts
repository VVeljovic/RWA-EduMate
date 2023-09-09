import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { LocalAuthGuard } from 'src/auth/localStrategy/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwtStrategy/jwt-auth.guard';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(private userService:UserService)
    {

    }
    @Post('signUp')
    signUp(@Body()user:IUser)
    {
        return this.userService.register(user);
    }
    @UseGuards(LocalAuthGuard)
   @Get('login')
   login(@Request()req):any{
return req.user;
   }
   @UseGuards(JwtAuthGuard)
   @Get('getUsersOnSameCourse')
   getUsers(@Request()req):Promise<Observable<IUser[]>>
   {
    const currentUser = req.user;
    const usersOnSameCourse =  this.userService.getUsersOnSameCourse(currentUser.course);
    return usersOnSameCourse;
   }

}
