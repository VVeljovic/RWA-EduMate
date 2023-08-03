import { Injectable } from '@nestjs/common';
import { PostEntity } from '../models/post.entity';
import {Repository,UpdateResult,DeleteResult} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { IPost } from '../models/post.interface';
import {Observable,from} from 'rxjs';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository:Repository<PostEntity>
    ){}
        createPost(post:IPost): Observable<IPost>{
            return from( this.postRepository.save(post));
        }
        findAllPosts():Observable<IPost[]>{
            return from(this.postRepository.find());
        }
        updatePost(id:number,post:IPost) : Observable<UpdateResult>{
            return from(this.postRepository.update(id,post));
        }
        deletePost(id:number):Observable<DeleteResult>{
            return from(this.postRepository.delete(id));
        }
}
