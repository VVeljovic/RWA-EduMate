import { CommentEntity } from 'src/comments/models/comment.entity';
import { MarksEntity } from 'src/marks/models/marks.entity';
import { UserEntity } from 'src/user/models/user.entity';
import {Column,Entity,ManyToOne,OneToMany,PrimaryGeneratedColumn} from 'typeorm';


@Entity('post')
export class PostEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({default:''})
    body:string;
    @Column({nullable:true})
    image:string;
    @Column({default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;
    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.posts)
    author:UserEntity;
    @OneToMany(()=>CommentEntity,(commentEntity)=>commentEntity.post)
    comments:CommentEntity[];
    @OneToMany(()=>MarksEntity,(marksEntity)=>marksEntity.post)
    marks:MarksEntity[];
}