import { IPost } from "src/post/models/post.interface";
import { IUser } from "src/user/models/user.interface";

export interface Marks{
    id?:number;
    value:number;
    rater:IUser;
    post:IPost
}