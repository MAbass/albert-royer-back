import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ObjectIdColumn,
	OneToOne,
	UpdateDateColumn
} from 'typeorm'
import { Role } from './role.entity'

@Entity({ name: 'users' })
export class User {
	@ObjectIdColumn()
	_id: string

	@Column()
	username: string

	@Column()
	password: string

	@Column()
	phone: string

	@OneToOne(
		() => Role,
		role => role._id
	)
	@JoinColumn()
	role: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
