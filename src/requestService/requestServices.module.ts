import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";

import {
    RequestServices,
    RequestServicesSchema,
} from "./schemas/requestService.schemas";
import { RequestServicesController } from "./controllers/requestServices.controllers";
import { RequestServiceService } from "./services/requestServices.services";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RequestServices.name, schema: RequestServicesSchema },
        ]),
    ],
    controllers: [RequestServicesController],
    providers: [RequestServiceService],
    exports: [MongooseModule, RequestServiceService],
})
export class RequestServicesModule {}
