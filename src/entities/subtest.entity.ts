import mongoose, { Document, SchemaTypes, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Quiz, QuizSchema } from "./quiz.entity";

export type SubTestDocument = SubTest & Document;

@Schema({ timestamps: true })
export class SubTest {
  _id: string;
  @Prop()
  name: string;

  @Prop({ type: SchemaTypes.Array, ref: "Quiz" })
  quiz: mongoose.Schema.Types.ObjectId[];
}

export const SubTestSchema = SchemaFactory.createForClass(SubTest);
