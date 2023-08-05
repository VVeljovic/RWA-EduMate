import { Controller, Post, Body, Get, Put, Param, Delete,Request} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../models/post.interface';
import {Observable}from 'rxjs';
import {UpdateResult, DeleteResult}from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwtStrategy/jwt-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
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
   console.log(course);
   return(this.postService.getFilteredPosts(course,year));
 }
}
