import { Controller, Post, Body, Get, Put, Param, Delete,Request, UseGuards} from '@nestjs/common';
import { MarksService } from '../services/marks.service';
import { JwtAuthGuard } from 'src/auth/jwtStrategy/jwt-auth.guard';
import { PostService } from 'src/post/services/post.service';
import { Marks } from '../models/marks.interface';
import { Observable, switchMap } from 'rxjs';
import { IPost } from 'src/post/models/post.interface';

@Controller('marks')
export class MarksController {
    constructor(private markService:MarksService,private postService:PostService)
    {

    }
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    createMark(@Param('id')id:number, @Body()mark:Marks,@Request()req):Observable<Marks>{
        return this.postService.findPostById(id).pipe(
            switchMap((post:IPost)=>this.markService.rate(mark,post,req.user))
        );
    }
    @Put('calculateAverageMarks/:id')
   calucalteAverageMarks(@Param('id')id:number):Observable<number>{
    return this.markService.calculateAverageMarkForPost(id);
   }
   @Get('countMarks/:id')
   countMarks(@Param('id')id:number):Observable<number>{
    return this.markService.countMarks(id);
   }
}
