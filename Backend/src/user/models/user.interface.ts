import { IPost } from "src/post/models/post.interface";

export interface IUser {
    id?:number;
    name:string;
    surname:string;
    username:string;
    course:string;
    year:number;
    password:string;
    posts:IPost[];
    image?:string;
}