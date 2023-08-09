import { User } from "./user.model";
export interface Post {
     postId:number;
     body:string;
     author:User;
}
