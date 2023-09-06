import { PostEntity } from "src/post/models/post.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class CommentEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({default:''})
    content:string;
    @Column({default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;
    @ManyToOne(()=>PostEntity,(postEntity)=>postEntity.comments)
    post:CommentEntity;
   // @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.comments)
  //  author:UserEntity;


}