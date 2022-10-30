import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SubTest } from "./subtest.entity";

export type RecipientTestDocument = RecipientTest & Document;

// Nested Schema
@Schema()
export class CommentResult extends Document {
  @Prop()
  score: number;

  @Prop()
  decision: string;
}

// Nested Schema
@Schema()
export class QuizResult extends Document {
  @Prop({ type: CommentResult })
  firstQuiz: CommentResult;

  @Prop({ type: CommentResult })
  secondQuiz: CommentResult;

  @Prop({ type: CommentResult })
  thirdQuiz: CommentResult;

  @Prop({ type: CommentResult })
  fourthQuiz: CommentResult;
}

@Schema({ timestamps: true })
export class RecipientTest {
  @Prop({})
  _id: string;

  @Prop({ default: false })
  decision: boolean;

  @Prop()
  decisionComment: string;

  @Prop({ type: QuizResult })
  result: QuizResult;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Recipient" })
  recipient: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Subtest" })
  subtest: SubTest;
}

export const RecipientTestSchema = SchemaFactory.createForClass(RecipientTest);
