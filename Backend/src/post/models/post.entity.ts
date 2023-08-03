import {Column,Entity,PrimaryGeneratedColumn} from 'typeorm';


@Entity('post')
export class PostEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({default:''})
    body:string;

    @Column({default:()=>'CURRENT_TIMESTAMP'})
    createdAt:Date;
}