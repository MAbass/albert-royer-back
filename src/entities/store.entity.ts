import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { uuidv4 } from '@utils'
import { Expose, plainToClass } from 'class-transformer'

@Entity({
	name: 'stores',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class Store {
	@Expose()
	@ObjectIdColumn()
	_id: string

	@Expose()
	@Column()
	name: string

	@Expose()
	@Column()
	isActive: boolean

	@Expose()
	@Column()
	createdAt: number
	@Expose()
	@Column()
	updatedAt: number

	constructor(store: Partial<Store>) {
		if (store) {
			Object.assign(
				this,
				plainToClass(Store, store, {
					excludeExtraneousValues: true
				})
			)
			this._id = this._id || uuidv4()
			this.isActive = this.isActive !== undefined ? this.isActive : true
			this.createdAt = this.createdAt || +new Date()
			this.updatedAt = +new Date()
		}
	}
}
