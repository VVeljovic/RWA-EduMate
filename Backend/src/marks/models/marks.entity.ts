import { IsInt, Max, Min } from "class-validator";
import { userInfo } from "os";
import { PostEntity } from "src/post/models/post.entity";
import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('marks')
export class MarksEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    @IsInt()
    @Min(1)
    @Max(5)
    value:number;
    @ManyToOne(()=>PostEntity,(postEntity)=>postEntity.marks)
    post:MarksEntity;
    @ManyToOne(()=>UserEntity,(userEntity)=>userEntity.marks)
    rater:UserEntity;
}