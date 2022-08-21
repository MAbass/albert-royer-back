import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
	@ObjectIdColumn()
	_id: string

	@Column()
	firstname: string

	@Column()
	lastname: string

	@Column()
	email: string

	@Column()
	createdAt: number
}
