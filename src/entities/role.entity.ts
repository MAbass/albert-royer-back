import {
	Column,
	CreateDateColumn,
	Entity,
	ObjectIdColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'roles' })
export class Role {
	@ObjectIdColumn()
	_id: string

	@Column()
	name: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
