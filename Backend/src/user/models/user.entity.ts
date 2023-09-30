import { CommentEntity } from "src/comments/models/comment.entity";
import { MarksEntity } from "src/marks/models/marks.entity";
import { PostEntity } from "src/post/models/post.entity";
import { Role } from "src/post/models/role.enum";
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
    @Column({nullable:true})
    image:string;
    @Column({default:''})
    password:string;
    @Column({type:'enum',enum:Role,default:Role.USER})
    role:Role;
    @OneToMany(()=>PostEntity,(postEntity)=>postEntity.author)
    posts:PostEntity[];
    @OneToMany(()=>CommentEntity,(commentEntity)=>commentEntity.author)
    comments:CommentEntity[];
    @OneToMany(()=>MarksEntity,(MarksEntity)=>MarksEntity.rater)
    marks:MarksEntity[];

}