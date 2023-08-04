import { UserEntity } from 'src/user/models/user.entity';
import {Column,Entity,ManyToOne,PrimaryGeneratedColumn} from 'typeorm';


@Entity('post')
export class PostEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({default:''})
    body:string;

    @Column({default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;
    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.posts)
    author:UserEntity;
}