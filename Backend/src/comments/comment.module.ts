import { CommentsController } from "./controllers/comments.controller";
import { CommentEntity } from "./models/comment.entity";
import { CommentsService } from "./services/comments.service";
import {TypeOrmModule} from '@nestjs/typeorm';
import { Module, Post } from '@nestjs/common';
import { PostService } from "src/post/services/post.service";
import { PostModule } from "src/post/post.module";
import { PostEntity } from "src/post/models/post.entity";
@Module({
    imports:[
      TypeOrmModule.forFeature([CommentEntity,PostEntity]),
      PostModule
    ],
    providers: [CommentsService,PostService],
    controllers: [CommentsController],
    
  })
  export class CommentModule {}