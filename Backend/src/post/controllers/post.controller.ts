import { Controller, Post, Body, Get, Put, Param, Delete} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../models/post.interface';
import {Observable}from 'rxjs';
import {UpdateResult, DeleteResult}from 'typeorm';
@Controller('post')
export class PostController {

    constructor(private postService:PostService)
    {

    }
 @Post()
 createPost(@Body() post:IPost){
     return this.postService.createPost(post);
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

}
