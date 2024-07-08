import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { BaseSchema } from "src/@common/class";

export type RequestServicesDocument = RequestServices & mongoose.Document;
@Schema()
export class RequestServices extends BaseSchema {
    @Prop({ type: String, required: true, trim: true })
    name: string;

    @Prop({ type: String, required: true, trim: true })
    address: string;

    @Prop({ type: String, required: true, trim: true })
    phone: string;

    @Prop({ type: String, required: true, trim: true })
    serviceName: string;

    @Prop({ type: String, required: true, trim: true })
    serviceCategory: string;

    @Prop({ type: String, required: true, trim: true })
    serviceDescription: string;
}
export const RequestServicesSchema =
    SchemaFactory.createForClass(RequestServices);
