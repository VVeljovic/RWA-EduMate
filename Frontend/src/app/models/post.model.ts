import { User } from "./user.model";
export interface Post {
     id:number;
     body:string;
     author:User;
     image?:string;
}
