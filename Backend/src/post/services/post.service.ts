import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from '../models/post.entity';
import {Repository,UpdateResult,DeleteResult, OrderByCondition, MoreThan} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { IPost } from '../models/post.interface';
import {NotFoundError, Observable,from, map} from 'rxjs';
import { IUser } from 'src/user/models/user.interface';
import { IComment } from 'src/comments/models/comment.interface';
import { Role } from '../models/role.enum';
import { MarksEntity } from 'src/marks/models/marks.entity';

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
        getFilteredPosts(course: string, year: string, sort: string, minMark: number, maxMark: number): Observable<IPost[]> {
            let orderBy: OrderByCondition = { 'post.createdAt': 'DESC' };
            
            if (sort !== undefined && sort === 'ASC') {
              orderBy = { 'post.createdAt': 'ASC' };
            } else if (sort !== undefined && sort === 'DESC') {
              orderBy = { 'post.createdAt': 'DESC' };
            }
          
            const queryBuilder = this.postRepository.createQueryBuilder('post')
              .innerJoinAndSelect('post.author', 'author')
              .leftJoinAndMapMany(
                'post.marks',
                MarksEntity,
                'marks',
                'marks.post = post.id',
              )
              .orderBy(orderBy)
              .where(course !== undefined ? 'author.course = :course' : '1 = 1', { course })
              .andWhere(year !== undefined ? 'author.year = :year' : '1 = 1', { year });
          
            if (minMark !== undefined) {
              queryBuilder.andWhere('marks.value >= :minMark', { minMark });
              
            } if( maxMark !== undefined)
            {
                queryBuilder.andWhere('marks.value <= :maxMark', { maxMark });
            }
          
            return from(queryBuilder.getMany());
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
        createPost2(user:IUser,post:IPost):Observable<IPost>{
            const currentDate = new Date();
            const twentyFourHoursAgo = new Date();
            twentyFourHoursAgo.setDate(currentDate.getDate()-1);
            if(user.role===Role.USER){
                return from(
                    this.postRepository.findOne({
                        where:{
                            author:user,
                            createdAt:MoreThan(twentyFourHoursAgo),
                        }
                    }).then(existingPost=>{
                        if(existingPost)
                        {throw new NotFoundException('User can create just one post!');}
                        post.author=user;
                        return this.postRepository.save(post);
                    })
                );
            }
            post.author=user;
            return from(this.postRepository.save(post));
        }
       incrementNumberOfMarks(postId:number):Observable<IPost>{
        return from(this.postRepository.findOne({where:{id:postId}}).then((post:IPost)=>{
            post.numberOfMarks=post.numberOfMarks+1;
            return this.postRepository.save(post);
        }))
        
       }
       updateAverageMarks(postId:number,averageMark:number):Observable<IPost>{
        return from(this.postRepository.findOne({where:{id:postId}}).then((post:IPost)=>{
            post.averageMark=averageMark
            return this.postRepository.save(post);
        }))
    }
}
