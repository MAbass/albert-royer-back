import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'recipients' })
export class Recipient {
	@ObjectIdColumn()
	_id: string

	@Column()
	firstname: string

	@Column()
	lastname: string

	@Column()
	email: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
