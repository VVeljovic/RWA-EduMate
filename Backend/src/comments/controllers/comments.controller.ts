import { PostService } from 'src/post/services/post.service';
import { IComment } from '../models/comment.interface';
import { CommentsService } from '../services/comments.service';
import { Controller, Post, Body, Get, Put, Param, Delete,Request, UseGuards} from '@nestjs/common';
import { Observable } from 'rxjs';
import { IPost } from 'src/post/models/post.interface';
import { switchMap } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwtStrategy/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
    constructor(private commentService:CommentsService,private postService:PostService)
    {

    }
    @UseGuards(JwtAuthGuard)
    @Post(':id')
  createComment(@Param('id') id: number, @Body() comment: IComment,@Request()req): Observable<IComment> {
    return this.postService.findPostById(id).pipe(
      switchMap((post: IPost) => this.commentService.writeComment(comment, post,req.user)),
    );
  }
  @Get('getComments/:idPost')
  findAllComments(
    @Param('idPost')idPost?:number):Observable<IComment[]>{
        return(this.commentService.findAllComments(idPost));
    }
}
