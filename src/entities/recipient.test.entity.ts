import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SubTest } from "./subtest.entity";

export type RecipientTestDocument = RecipientTest & Document;

@Schema({ timestamps: true })
export class RecipientTest {
  @Prop({})
  _id: string;

  @Prop()
  score: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Recipient" })
  recipient: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Subtest" })
  subtest: SubTest;
}

export const RecipientTestSchema = SchemaFactory.createForClass(RecipientTest);
