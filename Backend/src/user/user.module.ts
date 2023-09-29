import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./models/user.entity";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { PostEntity } from "src/post/models/post.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers:[UserService],
    controllers:[UserController],
    exports:[UserService]
})
export class UserModule{}