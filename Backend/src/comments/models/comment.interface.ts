import { IPost } from "src/post/models/post.interface";
import { IUser } from "src/user/models/user.interface";

export interface IComment {
    id?:number;
    content:string;
    createdAt?:Date;
    author:IUser;
    post:IPost
}