import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as mongoose from "mongoose";
import { BaseSchema } from "src/@common/class";
import { User } from "src/user/schemas/user.schemas";

export type UserDetailsDocument = UserDetails & mongoose.Document;
@Schema()
export class UserDetails extends BaseSchema {
    @Prop({ type: String, required: true, trim: true })
    username: string;

    @Prop({ type: String, trim: true, required: true })
    email: string;

    @Prop({ type: String, trim: true, required: true })
    phone: string;

    @Prop({ type: String, trim: true, required: true })
    division: string;

    @Prop({ type: String, trim: true, required: true })
    address: string;

    @Prop({ type: String, trim: true, required: true })
    image: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    // user: User;
}
export const UserDetailsSchema = SchemaFactory.createForClass(UserDetails);
