import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../models/comment.entity';
import { Repository } from 'typeorm';
import { IComment } from '../models/comment.interface';
import { IPost } from 'src/post/models/post.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentEntity)
    private readonly commentRepository:Repository<CommentEntity>){}
    writeComment(comment:IComment,post:IPost):Observable<IComment>{
        comment.post=post;
        return from(this.commentRepository.save(comment));
    }
}
