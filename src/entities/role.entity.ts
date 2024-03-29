import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  _id: string;

  @Prop({ unique: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
