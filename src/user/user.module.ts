import { Module } from "@nestjs/common";
import { User, UserSchema } from "./schemas/user.schemas";
import { UserService } from "./services/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controllers/user.controller";
// import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        // MulterModule.register({
        //     dest: "./uploads",
        // }),
        // forwardRef(() => ProductsModule),
        // forwardRef(() => UserModule),
        // forwardRef(() => StoreFrontsModule),
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [MongooseModule, UserService],
})
export class UserModule {}
