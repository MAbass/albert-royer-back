import mongoose, { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Quiz } from './quizz.entity'

export type TestDocument = Test & Document

@Schema({ timestamps: true })
export class Test {
	@Prop({})
	_id: string

	@Prop()
	name: string

	@Prop()
	target: string

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Subtest' })
	quiz: Quiz[]
}

export const TestSchema = SchemaFactory.createForClass(Test)
