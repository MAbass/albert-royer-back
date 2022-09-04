import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type QuizDocument = Quiz & Document

@Schema({ timestamps: true })
export class Quiz {
	@Prop({})
	_id: string

	@Prop()
	name: string

	@Prop()
	numberOfQuestions: number

	@Prop()
	data: unknown

	@Prop()
	time: number

	@Prop()
	listOfResponses: unknown
}

export const QuizSchema = SchemaFactory.createForClass(Quiz)
