import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { UserController } from './user/controllers/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentsController } from './comments/controllers/comments.controller';
import { CommentModule } from './comments/comment.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.POSTGRES_HOST,
      port:parseInt(<string>process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true,
    }),
    PostModule, UserModule,AuthModule,CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
