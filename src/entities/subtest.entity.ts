import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Quiz } from "./quiz.entity";

export type SubTestDocument = SubTest & Document;

@Schema({ timestamps: true })
export class SubTest {
  @Prop({})
  _id: string;

  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" })
  quiz: Quiz[];
}

export const SubTestSchema = SchemaFactory.createForClass(SubTest);
