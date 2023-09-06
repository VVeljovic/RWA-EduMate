import { CommentEntity } from "src/comments/models/comment.entity";
import { PostEntity } from "src/post/models/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({default:''})
    name:string;
    @Column({default:''})
    surname:string;
    @Column({default:''})
    username:string;
    @Column({default:''})
    course:string;
    @Column()
    year:number;
    @Column({default:''})
    password:string;
    @OneToMany(()=>PostEntity,(postEntity)=>postEntity.author)
    posts:PostEntity[];
   // @OneToMany(()=>CommentEntity,(commentEntity)=>commentEntity.author)
   // comments:CommentEntity[];

}