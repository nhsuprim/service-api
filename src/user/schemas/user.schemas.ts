import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as mongoose from "mongoose";

import { BaseSchema } from "src/@common/class";

export type UserDocument = User & mongoose.Document;
@Schema()
export class User extends BaseSchema {
    @Prop({ type: String, required: true, trim: true })
    username: string;
    @Prop({ type: String, required: true, trim: true })
    email: string;
    @Prop({ type: String, required: true, trim: true })
    password: string;
    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
