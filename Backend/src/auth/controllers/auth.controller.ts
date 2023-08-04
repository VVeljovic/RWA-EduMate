import { Controller,Post, UseGuards,Request,Get } from '@nestjs/common';
import { LocalAuthGuard } from '../localStrategy/local-auth.guard';
import { AuthService } from '../services/auth.service';
import {JwtAuthGuard} from '../jwtStrategy/jwt-auth.guard';
@Controller('auth')
export class AuthController {


    constructor(private authService:AuthService)
    {

    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request()req)
    {
        return this.authService.generateToken(req.user);
    }
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request()req):Promise<any>{
return req.user;
    }
}
