import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Role } from "./role.entity";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role" })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
