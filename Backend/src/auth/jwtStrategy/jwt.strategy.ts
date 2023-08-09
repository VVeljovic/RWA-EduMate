import { ExtractJwt, Strategy } from "passport-jwt";
import {PassportStrategy} from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
constructor(private authService:AuthService)
{
    super(
        {
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'test'
        }
    );
}
async validate(payload:any)
{
   return{
    id:payload.sub,
    name:payload.name,
    surname:payload.surname,
    year:payload.year,
    course:payload.course
   }
}
}