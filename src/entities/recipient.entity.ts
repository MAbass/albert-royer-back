import mongoose, { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { User } from './user.entity'

export type RecipientDocument = Recipient & Document

@Schema({ timestamps: true })
export class Recipient {
	_id: string

	@Prop()
	firstname: string

	@Prop()
	lastname: string

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user: User
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient)
