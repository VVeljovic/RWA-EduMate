import { Controller, Post, Body, Get, Put, Param, Delete,Request,UploadedFile,UseInterceptors, Res, NotFoundException} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../models/post.interface';
import {Observable, map, switchMap}from 'rxjs';
import {UpdateResult, DeleteResult}from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwtStrategy/jwt-auth.guard';
import { Query, UseGuards } from '@nestjs/common/decorators';
import {v4 as uuidv4}from 'uuid';
import path = require('path');
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { storage } from 'src/user/controllers/user.controller';
import { of } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../models/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller('post')
export class PostController {

    constructor(private postService:PostService)
    {

    }
    @Roles(Role.PREMIUM)
    @UseGuards(JwtAuthGuard,RolesGuard)
 @Post()
 createPost(@Body() post:IPost, @Request()req){
     return this.postService.createPost(req.user,post);
 }
 @Get()
 findAll():Observable<IPost[]>
 {
    return this.postService.findAllPosts();
 }
 @Put(':id')
 updatePost(   
     @Param('id') id:number,
     @Body() post:IPost):Observable<UpdateResult>{
    return this.postService.updatePost(id,post)
 }

 @Delete(':id')
 deletePost(
    @Param('id') id:number
 ):Observable<DeleteResult>{
    return this.postService.deletePost(id);
 }
 @Get()
 findSpecificPosts(
   @Param('idUser')userId?:number
 ):Observable<IPost[]>
 {
   return (this.postService.findAllPosts());
 }
 @Get('getPostsFromUser/:idUser')
 findAllPostsFromUser(
   @Param('idUser')idUser?:number):Observable<IPost[]>
   {
      
      return(this.postService.findPostsFromUser(idUser));
   }
   @Get('getFilteredPosts/:course?/:year?/:sort?')
   getFilteredPosts(
    @Query('course') course?: string,
    @Query('year') year?: string,
    @Query('sort') sort?: string,
  ): Observable<IPost[]> 
 {
  console.log(course,year,sort);
   return(this.postService.getFilteredPosts(course,year,sort));
 }
 @UseGuards(JwtAuthGuard)
 @Get('getLastPostOfUser')
 getlastPost(@Request()req):Observable<IPost>
 {
  return(this.postService.findLastOnePost(req.user));
 }
 @UseGuards(JwtAuthGuard)
 @Post('uploadImage')
 @UseInterceptors(FileInterceptor('file', storage))
 uploadFile(@UploadedFile() file,@Request()req): Observable<Object> {
   return this.postService.findLastOnePost(req.user).pipe(
     switchMap((post: IPost) => {
       if (!post) {
         throw new NotFoundException(`Post not found`);
       }
 
       post.image = file.filename;
       return this.postService.updatePost(post.id, post).pipe(
         map(() => ({ imagePath: file.filename }))
       );
     })
   );
 }
 
   @Get('post-image/:imagename')
   findProfileImage(@Param('imagename')imagename,@Res()res):Observable<Object>{
    return of(res.sendFile(join(process.cwd(),'uploads/profileimages/'+imagename)));
   }
}
