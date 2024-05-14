import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDetails, UserDetailsSchema } from "./schemas/userDetails.schemas";
import { UserDetailsService } from "./services/userDetails.services";
import { UserDetailsController } from "./controllers/userDetails.controller";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserDetails.name, schema: UserDetailsSchema },
        ]),
        forwardRef(() => UserModule),
    ],
    providers: [UserDetailsService],
    controllers: [UserDetailsController],
    exports: [MongooseModule, UserDetailsService],
})
export class UserDetailsModule {}
