import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as mongoose from "mongoose";

import { BaseSchema } from "src/@common/class";
import { User } from "src/user/schemas/user.schemas";
import { UserDetails } from "src/userDetails/schemas/userDetails.schemas";

export type ServicesDocument = Services & mongoose.Document;
@Schema({ timestamps: true })
export class Services extends BaseSchema {
    @Prop({ type: String, required: true, trim: true })
    serviceName: string;
    @Prop({ type: String, required: true, trim: true })
    category: string;
    @Prop({ type: String, required: true, trim: true })
    discription: string;
    @Prop({ type: Number, required: true, trim: true })
    price: number;
    @Prop({ type: String, required: true, trim: true })
    image: string;
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserDetails",
        required: true,
    })
    userId: UserDetails;

    // @Prop({ type: Date, default: Date.now })
    // createdAt: Date;
    // @Prop({ type: Date, default: Date.now })
    // updatedAt: Date;
}
export const ServicesSchema = SchemaFactory.createForClass(Services);
