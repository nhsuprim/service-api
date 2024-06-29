import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { BaseSchema } from "src/@common/class";
import { Services } from "src/services/schemas/service.schemas";
import { OrderStatus } from "../enums/order.enums";
import { UserDetails } from "src/userDetails/schemas/userDetails.schemas";

export type OrderDocument = Order & mongoose.Document;
@Schema()
export class Order extends BaseSchema {
    @Prop({ type: String, required: false, trim: true })
    note?: string;

    @Prop({ type: Number, required: false, trim: true })
    cost: number;

    @Prop({
        type: String,
        enum: OrderStatus,
        default: OrderStatus.RECEIVED,
    })
    status: OrderStatus;

    @Prop({
        type: Date,
    })
    appointedDate: Date;
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
        required: true,
    })
    serviceId: Services;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
        required: true,
    })
    clientId: UserDetails;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
