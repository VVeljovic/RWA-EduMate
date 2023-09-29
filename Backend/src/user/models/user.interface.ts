import { IPost } from "src/post/models/post.interface";
import { Role } from "src/post/models/role.enum";

export interface IUser {
    id?:number;
    name:string;
    surname:string;
    username:string;
    course:string;
    year:number;
    password:string;
    role?:Role;
    posts:IPost[];
    image?:string;
}