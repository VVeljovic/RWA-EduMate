import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../models/comment.entity';
import { Repository } from 'typeorm';
import { IComment } from '../models/comment.interface';
import { IPost } from 'src/post/models/post.interface';
import { Observable, from } from 'rxjs';
import { IUser } from 'src/user/models/user.interface';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentEntity)
    private readonly commentRepository:Repository<CommentEntity>){}
    writeComment(comment:IComment,post:IPost,user:IUser):Observable<IComment>{
        comment.post=post;
        comment.author=user;
        return from(this.commentRepository.save(comment));
    }
    findAllComments(postId:number):Observable<IComment[]>{
           return from(this.commentRepository.find({
            where:{post:{id:postId}}
           }))
    }
}
