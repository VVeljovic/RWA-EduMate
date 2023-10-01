import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarksEntity } from '../models/marks.entity';
import { Repository } from 'typeorm';
import { Marks } from '../models/marks.interface';
import { IPost } from 'src/post/models/post.interface';
import { IUser } from 'src/user/models/user.interface';
import { Observable, from, map } from 'rxjs';
import { PostService } from 'src/post/services/post.service';

@Injectable()
export class MarksService {
    constructor(@InjectRepository(MarksEntity)private readonly marksRepository:Repository<MarksEntity>,private postService:PostService){}
    rate(mark:Marks,post:IPost,user:IUser):Observable<Marks>{
        mark.post=post;
        mark.rater=user;
        this.postService.incrementNumberOfMarks(post.id);
        return from(this.marksRepository.save(mark));
    }
    calculateAverageMarkForPost(postId: number): Observable<number> {
        return from(
          this.marksRepository
            .createQueryBuilder('mark')
            .select('AVG(mark.value)', 'averageMark')
            .where('mark.post.id = :postId', { postId })
            .getRawOne(),
        ).pipe(
          map(result => {
            this.postService.updateAverageMarks(postId,result.averageMark);
            return result.averageMark || 0;
          }),
        );
      
      }
      countMarks(postId: number): Observable<number> {
        return from(
          this.marksRepository
            .createQueryBuilder('mark')
            .select('COUNT(mark)', 'marksNumber')
            .where('mark.post.id = :postId', { postId })
            .getRawOne(),
        ).pipe(
          map(result => {
            return result.marksNumber || 0;
          }),
        );
      }
}
