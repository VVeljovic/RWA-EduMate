import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}