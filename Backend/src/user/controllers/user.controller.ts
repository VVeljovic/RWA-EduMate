import { Body, Controller, Get, Post, UseGuards,Request, UploadedFile, UseInterceptors, Param, Res, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.interface';
import { LocalAuthGuard } from 'src/auth/localStrategy/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwtStrategy/jwt-auth.guard';
import { Observable,of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
//import path from 'path';
import {v4 as uuidv4}from 'uuid';
import path = require('path');
import { join } from 'path';
export const storage = {
    storage:diskStorage({
        destination:'./uploads/profileimages',
        filename:(req,file,cb)=>{
            const filename:string = path.parse(file.originalname).name.replace(/\s/g,'')+uuidv4();
            const extension:string = path.parse(file.originalname).ext;
            cb(null,`${filename}${extension}`)
        }
    })
   }
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
   @UseGuards(JwtAuthGuard)
   @Post('uploadProfileImage')
   @UseInterceptors(FileInterceptor('file',storage))
   uploadFile(@UploadedFile()file, @Request()req):Observable<Object>{
    const user:IUser = req.user;
    user.image=file.filename;
    this.userService.updateUser(user.id,user);
    console.log(user);
    console.log(file);
    return of({imagePath:file.filename});
   }
   @Get('profile-image/:imagename')
   findProfileImage(@Param('imagename')imagename,@Res()res):Observable<Object>{
    return of(res.sendFile(join(process.cwd(),'uploads/profileimages/'+imagename)));
   }
   @UseGuards(JwtAuthGuard)
   @Put('updateUserRole')
   updateUserRole(@Request()req):Observable<IUser>{
    return this.userService.updateUserRole(req.user);
   }
}
