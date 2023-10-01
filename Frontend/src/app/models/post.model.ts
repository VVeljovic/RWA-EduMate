import { User } from "./user.model";
export interface Post {
     id:number;
     body:string;
     createdAt?:Date;
     numberOfMarks?:number;
     averageMark?:number;
     author:User;
     image?:string;
}
