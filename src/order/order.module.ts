import { Module, forwardRef } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";

import { ServiceModule } from "src/services/services.module";
import { Order, OrderSchema } from "./schemas/order.schemas";
import { OrdersController } from "./controllers/order.controllers";
import { OrdersService } from "./services/order.services";
import { UserDetailsModule } from "src/userDetails/userDetails.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
        forwardRef(() => ServiceModule),
        forwardRef(() => UserDetailsModule),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [MongooseModule, OrdersService],
})
export class OrdersModule {}
