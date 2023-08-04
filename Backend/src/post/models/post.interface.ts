import { IUser } from "src/user/models/user.interface";

export interface IPost {
    id?:number;
    body?:string;
    createdAt?:Date;
    user?:IUser
}