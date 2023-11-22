import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SubTest } from "./subtest.entity";

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  _id: string;

  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "SubTest" })
  subtest: SubTest;
}

export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.index({ name: "text", description: "text" });
