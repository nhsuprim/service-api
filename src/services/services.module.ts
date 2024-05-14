import { Module, forwardRef } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { Services, ServicesSchema } from "./schemas/service.schemas";
import { UserDetailsModule } from "src/userDetails/userDetails.module";
import { Servicesinfo } from "./services/services.service";
import { ServiceController } from "./controllers/service.controller";

// import { MulterModule } from "@nestjs/platform-express";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Services.name, schema: ServicesSchema },
        ]),
        // MulterModule.register({
        //     dest: "./uploads",
        // }),
        forwardRef(() => UserDetailsModule),
        // forwardRef(() => UserModule),
        // forwardRef(() => StoreFrontsModule),
    ],
    providers: [Servicesinfo],
    controllers: [ServiceController],
    exports: [MongooseModule, Servicesinfo],
})
export class ServiceModule {}
