import { Controller, Post, Body, Get, Put, Param, Delete,Request,UploadedFile,UseInterceptors, Res, NotFoundException} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../models/post.interface';
import {Observable, map, switchMap}from 'rxjs';
import {UpdateResult, DeleteResult}from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwtStrategy/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import {v4 as uuidv4}from 'uuid';
import path = require('path');
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { storage } from 'src/user/controllers/user.controller';
import { of } from 'rxjs';
@Controller('post')
export class PostController {

    constructor(private postService:PostService)
    {

    }
    @UseGuards(JwtAuthGuard)
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
   @Get('getFilteredPosts/:course?/:year?')
 getFilteredPosts(@Param('course')course?:string,@Param('year')year?:number):Observable<IPost[]>
 {
   return(this.postService.getFilteredPosts(course,year));
 }
 @Post('uploadImage/:id')
 @UseInterceptors(FileInterceptor('file', storage))
 uploadFile(@UploadedFile() file, @Param('id') id): Observable<Object> {
   return this.postService.findPostById(id).pipe(
     switchMap((post: IPost) => {
       if (!post) {
         throw new NotFoundException(`Post with id ${id} not found`);
       }
 
       post.image = file.filename;
       return this.postService.updatePost(id, post).pipe(
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
