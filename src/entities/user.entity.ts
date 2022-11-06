import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Role } from "./role.entity";
import { SubTest } from "./subtest.entity";

export type UserDocument = User & Document;

@Schema({ _id: false })
export class TokenClass {
  @Prop({ type: Date })
  date: Date;

  @Prop({})
  tokenId: string;
}

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop()
  name: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ unique: true })
  phone: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  password: string;

  @Prop({ type: TokenClass })
  token: TokenClass;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "SubTest" })
  subTestId: SubTest;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role" })
  role: Role;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ name: "text", email: "text" });
export { UserSchema };
