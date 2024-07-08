import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserModule } from "./user/user.module";
import { UserDetailsModule } from "./userDetails/userDetails.module";
import { ServiceModule } from "./services/services.module";
import { OrdersModule } from "./order/order.module";
import { RequestServicesModule } from "./requestService/requestServices.module";
// import { AuthModule } from "./auth/auth.module";
require("dotenv").config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGODB_URI),
        UserModule,
        UserDetailsModule,
        ServiceModule,
        OrdersModule,
        RequestServicesModule,
        // AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
//     private readonly logger = new Logger(AppModule.name);

//     constructor() {
//         this.connectToDatabase();
//     }

//     async connectToDatabase() {
//         try {
//             await mongoose.connect(
//                 "mongodb+srv://service_station:t0sNPd4Yef9l0ElO@cluster0.ql1sr.mongodb.net/service_station?retryWrites=true&w=majority&appName=Cluster0"
//             );
//             this.logger.log("Connected to MongoDB");
//         } catch (error) {
//             this.logger.error("Failed to connect to MongoDB", error.stack);
//         }
//     }
// }
