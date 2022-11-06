import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SubTest } from "./subtest.entity";
import { User } from "./user.entity";

export type RecipientTestDocument = RecipientTest & Document;

// Nested Schema
@Schema({ _id: false })
export class CommentResult {
  @Prop()
  score: number;

  @Prop()
  decision: string;
}

// Nested Schema
@Schema({ _id: false })
export class QuizResult {
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
  _id: string;

  @Prop({ default: "waiting", enum: ["waiting", "rejected", "approved"] })
  decision: string;

  @Prop()
  decisionComment: string;

  @Prop({ type: QuizResult })
  result: QuizResult;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "SubTest" })
  subtest: SubTest;
}

export const RecipientTestSchema = SchemaFactory.createForClass(RecipientTest);
