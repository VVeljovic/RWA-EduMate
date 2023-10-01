import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
   } from 'typeorm';
    
   @Entity('chat')
   export class ChatEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column()
    username: string;
    
    @Column({ unique: true })
    text: string;
    
    @CreateDateColumn({default:()=>'CURRENT_TIMESTAMP'})
    createdAt: Date;
   }