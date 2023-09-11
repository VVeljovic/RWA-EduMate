import { IComment } from "src/comments/models/comment.interface";
import { IUser } from "src/user/models/user.interface";

export interface IPost {
    id?:number;
    body?:string;
    createdAt?:Date;
    image?:string;
    author?:IUser;
    comments?:IComment[];
}