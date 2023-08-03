import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { LocalAuthGuard } from 'src/auth/localStrategy/local-auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService:UserService)
    {

    }
    @Post()
    signUp(@Body()user:IUser)
    {
        return this.userService.register(user);
    }
    @UseGuards(LocalAuthGuard)
   @Get('login')
   login(@Request()req):any{
return req.user;
   }

}
