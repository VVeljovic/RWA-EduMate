import { Module } from '@nestjs/common';
import { MarksController } from './controllers/marks.controller';
import { MarksService } from './services/marks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarksEntity } from './models/marks.entity';
import { PostService } from 'src/post/services/post.service';
import { PostEntity } from 'src/post/models/post.entity';
import { PostModule } from 'src/post/post.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([MarksEntity,PostEntity]),
    PostModule
  ],
  controllers: [ MarksController],
  providers: [ MarksService,PostService]
})
export class MarksModule {}
