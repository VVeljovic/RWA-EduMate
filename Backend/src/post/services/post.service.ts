import { Injectable } from '@nestjs/common';
import { PostEntity } from '../models/post.entity';
import {Repository,UpdateResult,DeleteResult} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { IPost } from '../models/post.interface';
import {Observable,from} from 'rxjs';
import { IUser } from 'src/user/models/user.interface';
import { IComment } from 'src/comments/models/comment.interface';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository:Repository<PostEntity>
    ){}
        createPost(user:IUser,post:IPost): Observable<IPost>{
            post.author=user;
            return from( this.postRepository.save(post));
        }
        findAllPosts():Observable<IPost[]>{
            return from(this.postRepository.createQueryBuilder('post').innerJoinAndSelect('post.author','author').getMany());
        }
        updatePost(id:number,post:IPost) : Observable<UpdateResult>{
            return from(this.postRepository.update(id,post));
        }
        deletePost(id:number):Observable<DeleteResult>{
            return from(this.postRepository.delete(id));
        }
        findPostsFromUser(userId:number):Observable<IPost[]>{
            return from(this.postRepository.find({
                where:{author:{id:userId}}
            }))
        }
        getFilteredPosts(course:string,year:number):Observable<IPost[]>{
            return from(this.postRepository.createQueryBuilder('post')
            .innerJoinAndSelect('post.author', 'author') 
            .where(course!=undefined ? 'author.course = :course' : '1 = 1', { course })
            .andWhere(year!=undefined? 'author.year=:year':'1=1',{year})
            .getMany())
        }
        findPostById(id:number):Observable<IPost>{
            return from(this.postRepository.findOne({ where: { id } }));
        }
        findLastOnePost(user:IUser):Observable<IPost>{
            const username:string = user.username;
            console.log(user);
            console.log(username);
            return from(
                this.postRepository
                    .createQueryBuilder('post')
                    .innerJoinAndSelect('post.author', 'author')
                    .where('author.username = :username', { username })
                    .orderBy('post.createdAt', 'DESC') // Sortiranje po createdAt opadajuće
                    .getOne()
            );
        }
}
