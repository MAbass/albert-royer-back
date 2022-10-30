import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  numberOfQuestions: number;

  @Prop()
  text: string;

  @Prop({ type: "object" })
  data;

  @Prop()
  time: number;

  @Prop({ type: "object" })
  listOfResponses;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
