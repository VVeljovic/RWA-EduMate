import { User } from "./user.model";
export class Post {
    constructor(public postId:number,public title:string,public body:string,public author:User){}
}